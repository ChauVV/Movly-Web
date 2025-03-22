import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { DEPLOYER_ADDRESS, DEPLOYER_ABI, USDT_ADDRESS } from '../../config/BNBcontracts';
import { FaExclamationCircle } from 'react-icons/fa';
import { SiTether } from 'react-icons/si';
import { SiBinance } from 'react-icons/si';
import bg from '@assets/images/mm5.jpg';
import silverCoin from '@assets/tokens/silverSmall.png';
import './BuyToken.css';
import { toast } from 'react-hot-toast';
import DialogResult from './DialogResult';
import ConnectWallet from './ConnectWallet';
import Footer from '../../components/Footer';
import Header from '@/components/Header';

function BuyToken() {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('BNB');
  const [estimatedTokens, setEstimatedTokens] = useState({ baseTokens: 0, bonusTokens: 0, totalTokens: 0 });
  const [saleInfo, setSaleInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bnbPrice, setBnbPrice] = useState(0);
  const [isTooltipActive, setIsTooltipActive] = useState(false);

  // Dialog states
  const [showDialog, setShowDialog] = useState(false);
  const [dialogResult, setDialogResult] = useState(null);

  // Manual wallet management - now shared with ConnectWallet component
  const [account, setAccount] = useState(null);

  const MOVLY_PER_USDT = 25;
  const BONUS_PERCENT = 15;

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

    // Calculate bonus tokens
    const bonusTokens = baseTokens * (BONUS_PERCENT / 100);
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
    if (account) {
      fetchPrices();
      const interval = setInterval(fetchPrices, 30000); // Update every 30 seconds
      return () => clearInterval(interval);
    }
  }, [account]);

  useEffect(() => {
    const fetchSaleStatus = async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching sale status:", error);
      }
    };

    if (account) {
      fetchSaleStatus();
    }
  }, [account]);

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

  const handleInfoClick = () => {
    setIsTooltipActive(!isTooltipActive);
  };

  const paymentOptions = [
    { value: 'BNB', label: 'BNB', icon: <SiBinance size={20} /> },
    { value: 'USDT', label: 'USDT', icon: <SiTether size={20} /> }
  ];

  // Use account instead of address and isConnected
  const isWalletConnected = !!account;

  return (
    <div className="buy-token-fixed-container">
      <Header />
      <div className="token-sale-content-wrapper">
        <div className="token-sale-bg">
          <img src={bg} alt="background" />
          <div className="token-sale-bg-overlay" />
        </div>

        <div className="token-sale-main-content">
          <h1 className="token-sale-heading">Buy Movly Token</h1>

          {/* Wallet connection */}
          <ConnectWallet account={account} setAccount={setAccount} />

          {/* Card */}
          <div className="token-sale-card">
            <h2 className="token-sale-card-title">Purchase Tokens</h2>

            <div className="token-sale-form-group">
              <p className="info-label">Payment Method</p>
              <div className="token-sale-select-wrapper">
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="token-sale-select"
                >
                  {paymentOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="token-sale-select-icon">
                  {paymentOptions.find(opt => opt.value === paymentMethod)?.icon}
                </div>
              </div>
            </div>

            <div className="token-sale-form-group">
              <p className="info-label">Amount ({paymentMethod})</p>
              <div className="token-sale-input-group">
                <input
                  type="number"
                  className="token-sale-input"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder={`Enter amount in ${paymentMethod}`}
                  min="0"
                  step="any"
                />
                <div className="token-sale-input-icon">
                  {paymentOptions.find(opt => opt.value === paymentMethod)?.icon}
                </div>
              </div>
            </div>

            <div className="info-item">
              <div className="token-sale-calc">
                <div className="token-sale-row">
                  <span>BASE Movly:</span>
                  <span className="token-sale-amount">
                    <span>{Number(estimatedTokens.baseTokens).toLocaleString()}</span>
                    <span className="token-sale-unit">Movly</span>
                    <img src={silverCoin} alt="Movly" className="token-sale-icon" />
                  </span>
                </div>
                <div className="token-sale-row">
                  <span>BONUS ({BONUS_PERCENT}%):</span>
                  <span className="token-sale-amount">
                    <span>{Number(estimatedTokens.bonusTokens).toLocaleString()}</span>
                    <span className="token-sale-unit">Movly</span>
                    <img src={silverCoin} alt="Movly" className="token-sale-icon" />
                  </span>
                </div>
                <div className="token-sale-row total">
                  <span>You will receive:</span>
                  <span className="token-sale-amount">
                    <span>{Number(estimatedTokens.totalTokens).toLocaleString()}</span>
                    <span className="token-sale-unit">Movly</span>
                    <img src={silverCoin} alt="Movly" className="token-sale-icon" />
                  </span>
                </div>

                <div className="token-sale-rate">
                  <div className="rate-with-info">
                    <span className="rate-text">Rate: 1 USDT = 25 Movly</span>
                    <FaExclamationCircle
                      className="info-icon"
                      title="* The displayed Movly amount is an estimate
* Actual amount will be calculated based on market price at transaction time
* Price updates every 30 seconds"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleBuy}
              disabled={!isWalletConnected || !amount || parseFloat(amount) <= 0 || loading}
              className="token-sale-buy-btn"
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
          </div>

          {/* Dialog */}
          <DialogResult isOpen={showDialog} onClose={handleCloseDialog} result={dialogResult} />
        </div>

        {/* Footer */}
        <div className="token-sale-footer elevated-footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default BuyToken; 