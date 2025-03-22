# Smart Contracts

## Movly Ecosystem Tokens

The Movly protocol is built on a deflationary dual-token economic model that ensures long-term sustainability through fixed supply caps and strategic token burning mechanisms.

### Movly Token (MOVLY)

MOVLY is the primary governance token of the Movly platform with a strict maximum supply cap to prevent inflation. Once the initial supply is minted at deployment, no additional tokens can ever be created.

**Key Features:**
- **Fixed Maximum Supply:** 5,000,000,000 MOVLY (5 billion)
- **Anti-Inflation Design:** No minting function exists after initial deployment
- **Symbol:** MOVLY
- **Technical Standards:** ERC-20
- **Utilities:**
  - Ecosystem governance
  - Staking for rewards
  - Access to premium features
  - Purchase of NFT equipment and upgrades

**MOVLY Smart Contract:**
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * Movly Token (MOVLY)
 * @dev Governance token for the Movly ecosystem with fixed supply
 */
contract Movly is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 5000000000 * 10 ** 18; // 5 billion tokens

    /**
     * @dev Constructor that mints all tokens at deployment and assigns them to deployer
     * No additional minting function exists to prevent inflation
     */
    constructor() ERC20("Movly", "MOVLY") Ownable() {
        // Mint all tokens to deployer
        _mint(msg.sender, MAX_SUPPLY);
    }
}
```

### Movly Gold Earn Token (MGD)

MGD is the reward token within the Movly ecosystem, featuring a fixed maximum supply and a strategic burning mechanism to create deflationary pressure. This token is designed with anti-inflation measures built into its core.

**Key Features:**
- **Fixed Maximum Supply:** 10,000,000,000 MGD (10 billion)
- **Anti-Inflation Measures:**
  - No function to mint additional tokens after deployment
  - Active burning mechanism to continuously reduce circulating supply
- **Symbol:** MGD
- **Technical Standards:** ERC-20 with burning functionality
- **Utilities:**
  - Rewards for physical activity
  - Exchangeable for items in the marketplace
  - Participation in special events and challenges

**MGD Smart Contract:**
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * Movly Gold Earn Token
 * @dev Token earned through physical activities in Movly ecosystem with fixed supply
 * and burning mechanism to prevent inflation
 */
contract MGD is ERC20, ERC20Burnable, Ownable {
    uint256 public constant MAX_SUPPLY = 10000000000 * 10 ** 18; // 10 billion tokens

    event TokensBurned(address indexed from, uint256 amount);

    /**
     * @dev Constructor that mints all tokens at deployment and assigns them to deployer
     * No additional minting function exists to prevent inflation
     */
    constructor() ERC20("Movly Gold Earn", "MGD") Ownable() {
        // Mint all tokens to deployer
        _mint(msg.sender, MAX_SUPPLY);
    }

    /**
     * @dev Burns tokens from caller's address - key anti-inflation mechanism
     * @param amount Amount of tokens to burn
     */
    function burn(uint256 amount) public override {
        super.burn(amount);
        emit TokensBurned(msg.sender, amount);
    }

    /**
     * @dev Burns tokens from specified account - key anti-inflation mechanism
     * @param account Address to burn tokens from
     * @param amount Amount of tokens to burn
     */
    function burnFrom(address account, uint256 amount) public override {
        super.burnFrom(account, amount);
        emit TokensBurned(account, amount);
    }
}
```

## Anti-Inflation Design

Movly's tokenomics is specifically designed to combat inflation through multiple mechanisms:

1. **Hard Supply Caps:** Both MOVLY and MGD have strict maximum supplies that can never be increased
2. **No Minting Functions:** After initial deployment, no additional tokens can ever be created
3. **Active Burning Mechanism:** MGD incorporates burning functionality that permanently removes tokens from circulation
4. **Deflationary Pressure:** As the ecosystem grows, the burning rate increases, creating increasing scarcity

## Burning Mechanism

The MGD token's burning functionality is a cornerstone of Movly's economic sustainability:

- MGD tokens are permanently destroyed when used for certain in-app purchases and upgrades
- The burning process triggers the `TokensBurned` event, ensuring full transparency
- Each burning transaction reduces the circulating supply, potentially increasing token value over time
- Smart contract enforces that burned tokens can never be recovered or reintroduced

## Security and Transparency

Movly smart contracts are developed with a focus on security and transparency:

1. **Audited Code:** All contracts undergo rigorous third-party security audits
2. **OpenZeppelin Standards:** Built on battle-tested libraries to ensure best practices
3. **Public Verification:** Contracts are fully verified on blockchain explorers
4. **Immutable Rules:** Token supply caps and economic rules are hardcoded and unchangeable
