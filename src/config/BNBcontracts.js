// Contract addresses on BSC Testnet
export const DEPLOYER_ADDRESS = "0xAc3c5EdA096617a4871D1d0F7f46423b818f6581";
export const HST_ADDRESS = "0xb7C8969df0076bEe6922789AaB4bC73aAa8d45D2";
export const HSE_ADDRESS = "0x3d223ae97AA30f3b7dA4Be5b1F8a68749c37C289";
export const USDT_ADDRESS = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd";
export const WBNB_ADDRESS = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd";
export const BNB_USD_FEED = "0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526";
export const ETH_USD_FEED = "0x143db3CEEfbdfe5631aDD3E50f7614B6ba708BA7";

// Contract ABIs
export const DEPLOYER_ABI = [
  // View functions
  "function hst() external view returns (address)",
  "function hse() external view returns (address)",
  "function usdt() external view returns (address)",
  "function weth() external view returns (address)",
  "function teamWallet() external view returns (address)",
  "function advisorWallet() external view returns (address)",
  "function ecosystemWallet() external view returns (address)",
  "function marketingWallet() external view returns (address)",
  "function salePhase() external view returns (uint8)",
  "function paused() external view returns (bool)",
  "function getBNBPrice() external view returns (uint256)",
  "function getETHPrice() external view returns (uint256)",
  "function getClaimableAmount(address wallet) external view returns (uint256)",

  // State changing functions
  "function buyWithBNB() external payable",
  "function buyWithETH() external payable",
  "function buyWithUSDT(uint256 usdtAmount) external",
  "function claimVestedTokens() external",

  // Constructor
  "constructor(address _bnbUsdFeed, address _ethUsdFeed, address _usdt, address _weth, address _teamWallet, address _advisorWallet, address _ecosystemWallet, address _marketingWallet)",

  // Add USDT related functions
  "function usdt() external view returns (address)", // Get USDT contract address
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)"
]; 