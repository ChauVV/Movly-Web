// Contract addresses on Ganache
export const DEPLOYER_ADDRESS = "0x7882a5B13Efe40c185CA80fFf957643350501Da8";
export const HST_ADDRESS = "0x3861E91F471792776680dF5d57D8aB911Ae22801";
export const HSE_ADDRESS = "0xDb1A656D25F18c25232D9cd3F0BDE80C1C3fe6F8";
export const USDT_ADDRESS = "0x00F1C510fBf69198283752BDC75700330B745176";

// TokenDeployer ABI
export const DEPLOYER_ABI = [
  // View functions
  "function getETHPrice() external view returns (uint256)",
  "function getSaleStatus() external view returns (uint8, uint256, uint256, uint256, uint256, uint256)",
  "function hst() external view returns (address)",
  "function hse() external view returns (address)",
  "function getWalletBalances() external view returns (tuple(uint256 teamBalance, uint256 advisorBalance, uint256 ecosystemBalance, uint256 marketingBalance))",
  "function getVestingInfo(address wallet) external view returns (tuple(uint256 totalAmount, uint256 claimableAmount, uint256 nextClaimTime, uint256 vestingEndTime))",
  "function owner() external view returns (address)",
  "function paused() external view returns (bool)",
  "function salePhase() external view returns (uint8)",
  "function tokenPrice() external view returns (uint256)",
  "function totalSold() external view returns (uint256)",

  // State changing functions
  "function buyWithETH() external payable",
  "function buyWithUSDT(uint256 amount) external",
  "function initialize(address _bnbUsdFeed, address _ethUsdFeed, address _usdt, address _weth, address _teamWallet, address _advisorWallet, address _ecosystemWallet, address _marketingWallet) external",
  "function pause() external",
  "function unpause() external",
  "function setTokenPrice(uint256 _price) external",
  "function setSalePhase(uint8 _phase) external",
  "function withdrawETH() external",
  "function withdrawUSDT() external",

  // Events
  "event TokensPurchased(address indexed buyer, uint256 amount, uint256 price, string paymentMethod)",
  "event SalePhaseChanged(uint8 phase)",
  "event TokenPriceChanged(uint256 price)",
  "event Paused(address account)",
  "event Unpaused(address account)",

  // Constructor
  "constructor(address _bnbUsdFeed, address _ethUsdFeed, address _usdt, address _weth, address _teamWallet, address _advisorWallet, address _ecosystemWallet, address _marketingWallet)",

  // Add USDT related functions
  "function usdt() external view returns (address)", // Get USDT contract address
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)"
]; 