import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { DEPLOYER_ADDRESS, DEPLOYER_ABI, USDT_ADDRESS } from '../../config/BNBcontracts';
import { FaExclamationCircle } from 'react-icons/fa';
import { SiTether } from 'react-icons/si';
import { SiBinance } from 'react-icons/si';
import { RiAddFill } from 'react-icons/ri';
import bg from '@assets/images/mm5.jpg';
import goldCoin from '@assets/tokens/m200.png'
import styles from './BuyToken.module.css';
import { toast } from 'react-hot-toast';
import DialogResult from './DialogResult';
import ConnectWallet from './ConnectWallet';
import Footer from '../../components/Footer';
import Header from '@/components/Header';
import { NumericFormat } from 'react-number-format';

function BuyToken() {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('BNB');
  const [estimatedTokens, setEstimatedTokens] = useState({ baseTokens: 0, bonusTokens: 0, totalTokens: 0 });
  const [saleInfo, setSaleInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bnbPrice, setBnbPrice] = useState(0);

  // Dialog states
  const [showDialog, setShowDialog] = useState(false);
  const [dialogResult, setDialogResult] = useState(null);

  // Manual wallet management - now shared with ConnectWallet component
  const [account, setAccount] = useState(null);

  // Ajouter un nouvel état pour la modale d'information
  const [showInfoModal, setShowInfoModal] = useState(false);

  const MOVLY_PER_USDT = 25;
  const [bonusPercent, setBonusPercent] = useState(15);

  // Check if we're on mainnet or testnet to get the appropriate explorer URL
  const getExplorerUrl = (txHash) => {
    const networkId = window.ethereum ? window.ethereum.networkVersion : null;
    const isMainnet = networkId === '56';

    const baseUrl = isMainnet
      ? 'https://bscscan.com/tx/'
      : 'https://testnet.bscscan.com/tx/';

    return `${baseUrl}${txHash}`;
  };

  const fetchPrices = async () => {
    try {
      if (!window.ethereum) {
        // Fallback to using an API for BNB price when MetaMask isn't available
        const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT');
        const data = await response.json();
        // Convert price to same format as contract (8 decimals)
        const bnbPriceInWei = ethers.utils.parseUnits(data.price, 8);
        setBnbPrice(bnbPriceInWei);
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const tokenDeployer = new ethers.Contract(
        DEPLOYER_ADDRESS,
        DEPLOYER_ABI,
        provider
      );
      const bnbPriceData = await tokenDeployer.getBNBPrice();
      setBnbPrice(bnbPriceData);
    } catch (error) {
      console.error("Error fetching prices:", error);
      // Set a fallback BNB price in case of error (e.g. $220)
      const fallbackPrice = "220";
      const bnbPriceInWei = ethers.utils.parseUnits(fallbackPrice, 8);
      setBnbPrice(bnbPriceInWei);
    }
  };

  const calculateTokens = (inputAmount) => {
    if (!inputAmount) return { baseTokens: 0, bonusTokens: 0, totalTokens: 0 };

    let baseTokens;
    if (paymentMethod === 'BNB') {
      // Convert BNB price from wei to USD (8 decimal places)
      const bnbPriceUSD = bnbPrice ? parseFloat(ethers.utils.formatUnits(bnbPrice, 8)) : 0;
      baseTokens = parseFloat(inputAmount) * bnbPriceUSD * MOVLY_PER_USDT;
    } else {
      baseTokens = parseFloat(inputAmount) * MOVLY_PER_USDT;
    }

    // Calculate bonus tokens using dynamic bonusPercent
    const bonusTokens = baseTokens * (bonusPercent / 100);
    const totalTokens = baseTokens + bonusTokens;

    return {
      baseTokens: baseTokens.toFixed(2),
      bonusTokens: bonusTokens.toFixed(2),
      totalTokens: totalTokens.toFixed(2)
    };
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    const tokens = calculateTokens(value);
    setEstimatedTokens(tokens);
  };

  useEffect(() => {
    // Fetch prices even without account connection
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []); // Remove account dependency

  useEffect(() => {
    const fetchSaleStatus = async () => {
      try {
        if (!window.ethereum) return;

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const tokenDeployer = new ethers.Contract(
          DEPLOYER_ADDRESS,
          DEPLOYER_ABI,
          provider
        );
        const status = await tokenDeployer.getSaleStatus();
        setSaleInfo({
          phase: status[0],
          presaleSold: ethers.utils.formatEther(status[1]),
          presaleRemaining: ethers.utils.formatEther(status[2]),
          publicSaleSold: ethers.utils.formatEther(status[3]),
          publicSaleRemaining: ethers.utils.formatEther(status[4]),
          currentBonus: status[5].toNumber()
        });

        setBonusPercent(status[5].toNumber());
      } catch (error) {
        console.error("Error fetching sale status:", error);
      }
    };

    if (window.ethereum) {
      fetchSaleStatus();
    }
  }, []);  // Remove account dependency

  const handleBuy = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tokenDeployer = new ethers.Contract(DEPLOYER_ADDRESS, DEPLOYER_ABI, signer);

      if (paymentMethod === "BNB") {
        const amountInWei = ethers.utils.parseEther(amount);
        const tx = await tokenDeployer.buyWithBNB({ value: amountInWei });
        console.log("Buy tx sent:", tx.hash);
        await tx.wait();

        // Show success dialog
        setDialogResult({
          success: true,
          txHash: tx.hash,
          tokenAmount: estimatedTokens.totalTokens,
          paymentMethod: "BNB",
          paymentAmount: amount
        });
        setShowDialog(true);

      } else if (paymentMethod === "USDT") {
        try {
          const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);
          console.log("Amount in Wei:", amountInWei.toString());

          // Use USDT_ADDRESS from config
          console.log("USDT address:", USDT_ADDRESS);

          // Create USDT contract instance
          const usdtContract = new ethers.Contract(
            USDT_ADDRESS,
            [
              "function balanceOf(address) view returns (uint256)",
              "function approve(address, uint256) returns (bool)",
              "function allowance(address, address) view returns (uint256)"
            ],
            signer
          );

          const userAddress = await signer.getAddress();

          // Check USDT balance
          const usdtBalance = await usdtContract.balanceOf(userAddress);
          console.log("USDT balance:", ethers.utils.formatUnits(usdtBalance, 18));

          if (usdtBalance.lt(amountInWei)) {
            throw new Error(`Insufficient USDT balance. You have ${ethers.utils.formatUnits(usdtBalance, 18)} USDT`);
          }

          // Check and handle approval
          const allowance = await usdtContract.allowance(userAddress, DEPLOYER_ADDRESS);
          console.log("Current allowance:", ethers.utils.formatUnits(allowance, 18));

          if (allowance.lt(amountInWei)) {
            console.log("Approving USDT amount:", ethers.utils.formatUnits(amountInWei, 18));
            const approveTx = await usdtContract.approve(DEPLOYER_ADDRESS, amountInWei);
            console.log("Approve tx sent:", approveTx.hash);
            await approveTx.wait();
            console.log("Approve confirmed");
          }

          // Purchase tokens
          console.log("Buying tokens with USDT...");
          const tx = await tokenDeployer.buyWithUSDT(amountInWei);
          console.log("Buy tx sent:", tx.hash);
          await tx.wait();
          console.log("Purchase confirmed");

          // Show success dialog
          setDialogResult({
            success: true,
            txHash: tx.hash,
            tokenAmount: estimatedTokens.totalTokens,
            paymentMethod: "USDT",
            paymentAmount: amount
          });
          setShowDialog(true);

        } catch (error) {
          console.error("Detailed USDT error:", error);
          throw error;
        }
      }

      setAmount("");

    } catch (error) {
      console.error("Purchase failed:", error);

      // Analyze error to display appropriate message
      let errorMessage = "Transaction failed. Please try again.";

      if (error.message) {
        if (error.message.includes("user rejected transaction")) {
          errorMessage = "You canceled the transaction.";
        } else if (error.message.includes("insufficient funds")) {
          errorMessage = "Insufficient balance to complete the transaction.";
        } else if (error.message.includes("Presale completed")) {
          errorMessage = "Presale phase has ended. Please try again with Public Sale phase.";
        } else if (error.message.includes("Sale ended")) {
          errorMessage = "Token sale has ended.";
        } else {
          errorMessage = error.message;
        }
      }

      // Show error dialog
      setDialogResult({
        success: false,
        error: errorMessage,
        // If there's a txHash (e.g., from a successful approve but failed purchase)
        txHash: error.transactionHash || null
      });
      setShowDialog(true);

    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    // Fetch transaction info again if successful
    if (dialogResult?.success) {
      fetchPrices();
    }
  };

  useEffect(() => {
    const tokens = calculateTokens(amount);
    setEstimatedTokens(tokens);
  }, [paymentMethod, bnbPrice]);

  // Fonction pour gérer le clic sur l'icône d'information
  const handleInfoClick = () => {
    setShowInfoModal(true);
  };

  // Fonction pour fermer la modale
  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
  };

  const handleAddToken = async () => {
    try {
      const tokenAddress = "0xb7C8969df0076bEe6922789AaB4bC73aAa8d45D2";
      const tokenSymbol = "MOVLY";
      const tokenDecimals = 18;
      const tokenImage = "https://movly.run/images/m200.png";

      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      });

      if (wasAdded) {
        toast.success('MOVLY Token was added to MetaMask');
      } else {
        toast.error('Failed to add MOVLY Token');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while adding the token');
    }
  };

  const paymentOptions = [
    { value: 'BNB', label: 'BNB', icon: <SiBinance size={20} /> },
    { value: 'USDT', label: 'USDT', icon: <SiTether size={20} /> }
  ];

  // Use account instead of address and isConnected
  const isWalletConnected = !!account;

  return (
    <div className={styles['buy-token-fixed-container']}>
      <Header />
      <div className={styles['token-sale-content-wrapper']}>
        <div className={styles['token-sale-bg']}>
          <img src={bg} alt="background" />
          <div className={styles['token-sale-bg-overlay']} />
        </div>

        <div className={styles['token-sale-main-content']}>
          <h1 className={styles['token-sale-heading']}>Buy Movly Token</h1>

          {/* Wallet connection */}
          <ConnectWallet account={account} setAccount={setAccount} />
          {/* Card */}
          <div className={styles['token-sale-card']}>
            <h2 className={styles['token-sale-card-title']}>{`Purchase Tokens${bonusPercent > 0 ? ` - Presale (Bonus ${bonusPercent}%)` : ''}`}</h2>

            <div className={styles['token-sale-form-group']}>
              <p className={styles['info-label']}>Payment Method</p>
              <div className={styles['token-sale-select-wrapper']}>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className={styles['token-sale-select']}
                >
                  {paymentOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className={styles['token-sale-select-icon']}>
                  {paymentOptions.find(opt => opt.value === paymentMethod)?.icon}
                </div>
              </div>
            </div>

            <div className={styles['token-sale-form-group']}>
              <p className={styles['info-label']}>Amount ({paymentMethod})</p>
              <div className={styles['token-sale-input-group']}>
                <NumericFormat
                  className={styles['token-sale-input']}
                  value={amount}
                  onValueChange={(values) => {
                    const { value } = values;
                    handleAmountChange({ target: { value } });
                  }}
                  placeholder={`Enter amount in ${paymentMethod}`}
                  decimalScale={2}
                  allowNegative={false}
                  thousandSeparator=","
                  decimalSeparator="."
                />
                <div className={styles['token-sale-input-icon']}>
                  {paymentOptions.find(opt => opt.value === paymentMethod)?.icon}
                </div>
              </div>
            </div>

            <div className="info-item">
              <div className={styles['token-sale-calc']}>
                <div className={styles['token-sale-row']}>
                  <span>BASE Movly:</span>
                  <span className={styles['token-sale-amount']}>
                    <span>{Number(estimatedTokens.baseTokens).toLocaleString()}</span>
                    <span className={styles['token-sale-unit']}>Movly</span>
                    <img src={goldCoin} alt="Movly" className={styles['token-sale-icon']} />
                  </span>
                </div>
                <div className={styles['token-sale-row']}>
                  <span>BONUS ({bonusPercent}%):</span>
                  <span className={styles['token-sale-amount']}>
                    <span>{Number(estimatedTokens.bonusTokens).toLocaleString()}</span>
                    <span className={styles['token-sale-unit']}>Movly</span>
                    <img src={goldCoin} alt="Movly" className={styles['token-sale-icon']} />
                  </span>
                </div>
                <div className={`${styles['token-sale-row']} ${styles.total}`}>
                  <span>You will receive:</span>
                  <span className={styles['token-sale-amount']}>
                    <span>{Number(estimatedTokens.totalTokens).toLocaleString()}</span>
                    <span className={styles['token-sale-unit']}>Movly</span>
                    <img src={goldCoin} alt="Movly" className={styles['token-sale-icon']} />
                  </span>
                </div>

                <div className={styles['token-sale-rate']}>
                  <div className={styles['rate-with-info']}>
                    <span className={styles['rate-text']}>Rate: 1 USDT = 25 Movly</span>
                    <FaExclamationCircle
                      className={styles['info-icon']}
                      onClick={handleInfoClick}
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleBuy}
              disabled={!isWalletConnected || !amount || parseFloat(amount) <= 0 || loading}
              className={styles['token-sale-buy-btn']}
              title={
                !isWalletConnected
                  ? 'Please connect your wallet first'
                  : !amount || parseFloat(amount) <= 0
                    ? 'Please enter a valid amount'
                    : loading
                      ? 'Transaction in progress'
                      : `Buy Movly with ${paymentMethod}`
              }
            >
              {!isWalletConnected
                ? 'Connect Wallet to Buy'
                : loading
                  ? 'Processing...'
                  : !amount || parseFloat(amount) <= 0
                    ? 'Enter Amount to Buy'
                    : `Buy with ${paymentMethod}`}
            </button>

            {isWalletConnected && (
              <div>
                <div className={styles['token-line-seperate']} />
                <div className={styles['token-line-seperate-down-arrow']}></div>
                <div className={styles['token-line-seperate-down-arrow1']}></div>
                <div className={styles['token-info']}>
                  <button
                    onClick={handleAddToken}
                    className={styles['add-token-btn']}
                    title="Add MOVLY Token to MetaMask"
                  >
                    <RiAddFill size={20} />
                    Add MOVLY token to MetaMask
                  </button>

                  <div className={styles['token-icon']}>
                    <img src={goldCoin} alt="Movly" />
                  </div>

                  <div className={styles['token-address']}>
                    <div className={styles['token-details-group']}>
                      <div className={styles['token-detail']}>
                        <span className={styles['detail-label']}>Network:</span>
                        <span className={styles['detail-value']}>Binance Smart Chain [BSC]</span>
                      </div>

                      <div className={styles['token-detail']}>
                        <span className={styles['detail-label']}>Address:</span>
                        <span className={styles['detail-value']}>0xb7C8969df0076bEe6922789AaB4bC73aAa8d45D2</span>
                      </div>

                      <div className={styles['token-detail']}>
                        <span className={styles['detail-label']}>Symbol:</span>
                        <span className={styles['detail-value']}>MOVLY</span>
                      </div>

                      <div className={styles['token-detail']}>
                        <span className={styles['detail-label']}>Decimals:</span>
                        <span className={styles['detail-value']}>18</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Dialog */}
          <DialogResult isOpen={showDialog} onClose={handleCloseDialog} result={dialogResult} />

          {/* Ajouter la modale d'information */}
          {showInfoModal && (
            <div className={styles['info-modal-overlay']} onClick={handleCloseInfoModal}>
              <div className={styles['info-modal-content']} onClick={(e) => e.stopPropagation()}>
                <h3>Price Information</h3>
                <ul>
                  <li>The displayed Movly amount is an estimate</li>
                  <li>Actual amount will be calculated based on market price at transaction time</li>
                  <li>Price updates every 30 seconds</li>
                </ul>
                <button className={styles['info-modal-close']} onClick={handleCloseInfoModal}>Close</button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`${styles['token-sale-footer']} ${styles['elevated-footer']}`}>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default BuyToken;