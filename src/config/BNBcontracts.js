// Contract addresses on BSC Testnet
export const DEPLOYER_ADDRESS = "0xf2cF41b12af3c6AeA855cD33b7996B3f94EAcdEc";
export const MOVLY_ADDRESS = "0xb7C8969df0076bEe6922789AaB4bC73aAa8d45D2";
export const MGD_ADDRESS = "0x3d223ae97AA30f3b7dA4Be5b1F8a68749c37C289";
export const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";

// Contract ABIs
export const DEPLOYER_ABI = [
  // View functions
  "function movly() external view returns (address)",
  "function mgd() external view returns (address)",
  "function usdt() external view returns (address)",
  "function teamWallet() external view returns (address)",
  "function advisorWallet() external view returns (address)",
  "function ecosystemWallet() external view returns (address)",
  "function marketingWallet() external view returns (address)",
  "function currentPhase() external view returns (uint8)",
  "function getBNBPrice() external view returns (uint256)",
  "function getClaimableAmount(address wallet) external view returns (uint256)",
  "function getSaleStatus() external view returns (uint8,uint256,uint256,uint256,uint256,uint256)",

  // State changing functions
  "function buyWithBNB() external payable",
  "function buyWithUSDT(uint256 usdtAmount) external",
  "function claimVestedTokens() external",

  // Constructor
  "constructor(address _bnbPriceFeed, address _usdt, address _teamWallet, address _advisorWallet, address _ecosystemWallet, address _marketingWallet)",

  // Add USDT related functions
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)"
]; 