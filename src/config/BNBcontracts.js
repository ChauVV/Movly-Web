// Contract addresses on BSC Testnet
export const DEPLOYER_ADDRESS = "0xFE3094732f8D912E4A9c3D2e92ca7CC863A736e1";
export const MOVLY_ADDRESS = "0x9F2DfcC06AA978476E987F8Ab92CDcCdC0482540";
export const MGD_ADDRESS = "0x4cA2AdeFA53F06bAb98515665A8cA20a384056fb";
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