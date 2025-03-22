import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import { DEPLOYER_ADDRESS, DEPLOYER_ABI, USDT_ADDRESS } from '../../config/BNBcontracts';
import { FaExclamationCircle, FaExternalLinkAlt } from 'react-icons/fa';
import { SiTether } from 'react-icons/si';
import { SiBinance } from 'react-icons/si';
import bg from '@assets/images/mm5.jpg';
import silverCoin from '@assets/tokens/silverSmall.png';
import './BuyToken.css';
import { toast } from 'react-hot-toast';
import DialogResult from './DialogResult';

function BuyToken() {
  const { address, isConnected } = useAccount();
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('BNB');
  const [estimatedTokens, setEstimatedTokens] = useState({ baseTokens: 0, bonusTokens: 0, totalTokens: 0 });
  const [saleInfo, setSaleInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bnbPrice, setBnbPrice] = useState(0);
  const [isTooltipActive, setIsTooltipActive] = useState(false);
  const [lastTxHash, setLastTxHash] = useState('');

  // State cho dialog
  const [showDialog, setShowDialog] = useState(false);
  const [dialogResult, setDialogResult] = useState(null);

  const MOVLY_PER_USDT = 25;
  const BONUS_PERCENT = 15;

  // Kiểm tra nếu đang ở mainnet hay testnet để lấy URL explorer phù hợp
  const getExplorerUrl = (txHash) => {
    // Thay đổi network ID tùy theo mạng bạn đang kết nối
    // Chain ID của BSC Mainnet là 56, BSC Testnet là 97
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
      // Chuyển đổi giá BNB từ wei sang USD (8 số thập phân)
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
    if (isConnected) {
      fetchPrices();
      const interval = setInterval(fetchPrices, 30000); // Update every 30 seconds
      return () => clearInterval(interval);
    }
  }, [isConnected]);

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

    if (isConnected) {
      fetchSaleStatus();
    }
  }, [isConnected]);

  const handleBuy = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Vui lòng nhập số lượng hợp lệ");
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

        // Hiển thị dialog thành công
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

          // Sử dụng USDT_ADDRESS từ config thay vì gọi usdt()
          console.log("USDT address:", USDT_ADDRESS);

          // Tạo USDT contract instance
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

          // Kiểm tra balance USDT
          const usdtBalance = await usdtContract.balanceOf(userAddress);
          console.log("USDT balance:", ethers.utils.formatUnits(usdtBalance, 18));

          if (usdtBalance.lt(amountInWei)) {
            throw new Error(`Số dư USDT không đủ. Bạn có ${ethers.utils.formatUnits(usdtBalance, 18)} USDT`);
          }

          // Kiểm tra và xử lý approve
          const allowance = await usdtContract.allowance(userAddress, DEPLOYER_ADDRESS);
          console.log("Current allowance:", ethers.utils.formatUnits(allowance, 18));

          if (allowance.lt(amountInWei)) {
            console.log("Approving USDT amount:", ethers.utils.formatUnits(amountInWei, 18));
            const approveTx = await usdtContract.approve(DEPLOYER_ADDRESS, amountInWei);
            console.log("Approve tx sent:", approveTx.hash);
            await approveTx.wait();
            console.log("Approve confirmed");
          }

          // Thực hiện mua token
          console.log("Buying tokens with USDT...");
          const tx = await tokenDeployer.buyWithUSDT(amountInWei);
          console.log("Buy tx sent:", tx.hash);
          await tx.wait();
          console.log("Purchase confirmed");

          // Hiển thị dialog thành công
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

      // Phân tích lỗi để hiển thị thông báo phù hợp
      let errorMessage = "Giao dịch thất bại. Vui lòng thử lại.";

      if (error.message) {
        if (error.message.includes("user rejected transaction")) {
          errorMessage = "Bạn đã hủy giao dịch.";
        } else if (error.message.includes("insufficient funds")) {
          errorMessage = "Số dư không đủ để thực hiện giao dịch.";
        } else if (error.message.includes("Presale completed")) {
          errorMessage = "Giai đoạn Presale đã kết thúc. Vui lòng thử lại với giai đoạn Public Sale.";
        } else if (error.message.includes("Sale ended")) {
          errorMessage = "Đợt bán token đã kết thúc.";
        } else {
          errorMessage = error.message;
        }
      }

      // Hiển thị dialog lỗi
      setDialogResult({
        success: false,
        error: errorMessage,
        // Nếu có txHash (ví dụ từ approve thành công nhưng mua thất bại)
        txHash: error.transactionHash || null
      });
      setShowDialog(true);

    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    // Fetch lại thông tin giao dịch nếu thành công
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

  return (
    <div className="token-sale-container">
      <div className="token-sale-bg">
        <img src={bg} alt="background" />
        <div className="token-sale-bg-overlay" />
      </div>
      <h1 className="token-sale-heading">Buy Movly Token</h1>
      <div className="token-sale-content">
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
            disabled={!isConnected || !amount || parseFloat(amount) <= 0 || loading}
            className="token-sale-buy-btn"
          >
            {!isConnected
              ? 'Connect Wallet to Buy'
              : loading
                ? 'Processing...'
                : `Buy with ${paymentMethod}`}
          </button>

          {lastTxHash && (
            <div className="last-transaction">
              <a
                href={getExplorerUrl(lastTxHash)}
                target="_blank"
                rel="noopener noreferrer"
                className="transaction-link-small"
              >
                Giao dịch gần nhất <FaExternalLinkAlt size={10} />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Dialog kết quả giao dịch */}
      <DialogResult
        isOpen={showDialog}
        onClose={handleCloseDialog}
        result={dialogResult}
      />
    </div>
  );
}

export default BuyToken; 