# Token Earning Calculator Formula

## Configuration Structure

### STATS_CONFIG
```javascript
const STATS_CONFIG = {
  SHOE: {
    power: [
      { level: 1, range: [5, 10] },    // Level 1: Power 5-10
      { level: 2, range: [15, 20] },   // Level 2: Power 15-20
      { level: 3, range: [25, 30] },   // Level 3: Power 25-30
      { level: 4, range: [35, 40] },   // Level 4: Power 35-40
      { level: 5, range: [45, 50] },   // Level 5: Power 45-50
      { level: 6, range: [55, 60] },   // Level 6: Power 55-60
      { level: 7, range: [65, 70] },   // Level 7: Power 65-70
      { level: 8, range: [75, 80] },   // Level 8: Power 75-80
      { level: 9, range: [85, 90] },   // Level 9: Power 85-90
      { level: 10, range: [95, 100] }, // Level 10: Power 95-100
    ],
    baseTime: 6, // Base running time in minutes
  },
  WINGS: {
    power: [
      { level: 1, range: [1, 5] },     // Level 1: Power 1-5
      { level: 2, range: [6, 10] },    // Level 2: Power 6-10
      { level: 3, range: [11, 15] },   // Level 3: Power 11-15
      { level: 4, range: [16, 20] },   // Level 4: Power 16-20
      { level: 5, range: [21, 25] },   // Level 5: Power 21-25
      { level: 6, range: [26, 30] },   // Level 6: Power 26-30
      { level: 7, range: [31, 35] },   // Level 7: Power 31-35
      { level: 8, range: [36, 40] },   // Level 8: Power 36-40
      { level: 9, range: [41, 45] },   // Level 9: Power 41-45
      { level: 10, range: [46, 50] },  // Level 10: Power 46-50
    ],
    baseTime: 2, // Base running time in minutes
  },
  HALO: {
    power: [
      { level: 1, range: [1, 5] },     // Level 1: Power 1-5
      { level: 2, range: [6, 10] },    // Level 2: Power 6-10
      { level: 3, range: [11, 15] },   // Level 3: Power 11-15
      { level: 4, range: [16, 20] },   // Level 4: Power 16-20
      { level: 5, range: [21, 25] },   // Level 5: Power 21-25
      { level: 6, range: [26, 30] },   // Level 6: Power 26-30
      { level: 7, range: [31, 35] },   // Level 7: Power 31-35
      { level: 8, range: [36, 40] },   // Level 8: Power 36-40
      { level: 9, range: [41, 45] },   // Level 9: Power 41-45
      { level: 10, range: [46, 50] },  // Level 10: Power 46-50
    ],
    baseTime: 2, // Base running time in minutes
  }
};
```

### Configuration Explanation

1. **Structure Overview**
   - Each NFT type (SHOE, WINGS, HALO) has its own configuration
   - Each configuration contains:
     - `power`: Array of level-specific power ranges
     - `baseTime`: Initial running time in minutes

2. **Power Ranges**
   - **SHOE**:
     - Starts at 5-10 power (Level 1)
     - Increases by 10 each level
     - Maximum 95-100 power (Level 10)
   - **WINGS/HALO**:
     - Starts at 1-5 power (Level 1)
     - Increases by 5 each level
     - Maximum 46-50 power (Level 10)

3. **Time Calculation**
   - **SHOE**:
     - Base time: 6 minutes
     - Increases by 2 minutes per level
     - Formula: 6 + (level - 1) × 2
   - **WINGS/HALO**:
     - Base time: 2 minutes
     - Increases by 1 minute per level
     - Formula: 2 + (level - 1) × 1

4. **Usage in Calculations**
   - Power values are used from the range based on NFT level
   - Base times are used as starting points for time calculations
   - All values feed into the main token earning formula

## Basic Components

### 1. NFT Items
- **Shoe**
  - Level: 1-10
  - Power Range: 5-100 (increases by 10 each level)
  - Base Time: 6 minutes
  - Time Increase: +2 minutes per level
  - Max Level Stats: Level 10 = Power 95-100, Time 24 minutes

- **Wings**
  - Level: 1-10
  - Power Range: 1-50 (increases by 5 each level)
  - Base Time: 2 minutes
  - Time Increase: +1 minute per level
  - Max Level Stats: Level 10 = Power 46-50, Time 11 minutes

- **Halo**
  - Level: 1-10
  - Power Range: 1-50 (increases by 5 each level)
  - Base Time: 2 minutes
  - Time Increase: +1 minute per level
  - Max Level Stats: Level 10 = Power 46-50, Time 11 minutes

### 2. Maximum Values
- Max Tokens per Calculation: 600
- Max Total Power: 200 (Shoe: 100 + Wings: 50 + Halo: 50)
- Max Total Time: 46 minutes (Shoe: 24 + Wings: 11 + Halo: 11)

## Calculation Formula

### 1. Base Formula
```
Tokens Earned = Total Power × Total Time × Scaling Factor / 2^Halving

Where:
- Total Power = Shoe Power + Wings Power + Halo Power
- Total Time = Shoe Time + Wings Time + Halo Time
- Scaling Factor = Max Tokens / (Max Power × Max Time)
- Halving = Current halving level (0-3)
```

### 2. Scaling Factor Calculation
```
Scaling Factor = 600 / (200 × 46) = 0.0652
```

### 3. Time Calculation for Each Item
```
Item Time = Base Time + (Level - 1) × Time Increase

Example for Level 5 Shoe:
Time = 6 + (5 - 1) × 2 = 14 minutes
```

## Example Calculations

### Example 1: Basic Setup
```
Setup:
- Shoe: Level 1 (Power 5, Time 6)
- Wings: Level 1 (Power 1, Time 2)
- Halo: Level 1 (Power 1, Time 2)
- Halving: 0

Calculation:
Total Power = 5 + 1 + 1 = 7
Total Time = 6 + 2 + 2 = 10
Tokens = 7 × 10 × 0.0652 / 2^0 = 4.564 tokens
```

### Example 2: Mid-Level Setup
```
Setup:
- Shoe: Level 5 (Power 45, Time 14)
- Wings: Level 5 (Power 21, Time 6)
- Halo: Level 5 (Power 21, Time 6)
- Halving: 1

Calculation:
Total Power = 45 + 21 + 21 = 87
Total Time = 14 + 6 + 6 = 26
Tokens = 87 × 26 × 0.0652 / 2^1 = 73.461 tokens
```

### Example 3: Maximum Setup
```
Setup:
- Shoe: Level 10 (Power 100, Time 24)
- Wings: Level 10 (Power 50, Time 11)
- Halo: Level 10 (Power 50, Time 11)
- Halving: 0

Calculation:
Total Power = 100 + 50 + 50 = 200
Total Time = 24 + 11 + 11 = 46
Tokens = 200 × 46 × 0.0652 = 600 tokens
```

## Halving Impact
- Halving 0: Token rate × 1
- Halving 1: Token rate ÷ 2
- Halving 2: Token rate ÷ 4
- Halving 3: Token rate ÷ 8

Current halving is 0, with next halving estimated in 5.5 years.

## Important Notes
- Power values are calculated with 1 decimal place (e.g., 7.5, 3.0)
- Running time resets once per day
- Initial NFT prices:
  - Shoe: 250 USDT
  - Wings: TBD
  - Halo: TBD

## ROI Analysis (Level 1 Setup)
```
Basic Setup (Level 1):
Shoe: Power 7.5 (avg of 5-10), Time 6 min
Wings: Power 3.0 (avg of 1-5), Time 2 min
Halo: Power 3.0 (avg of 1-5), Time 2 min

Daily Earnings:
Total Power = 7.5 + 3.0 + 3.0 = 13.5
Total Time = 6 + 2 + 2 = 10 minutes
Tokens per day = 13.5 × 10 × 0.0652 = 8.802 tokens

ROI Calculation (2 months):
Initial Investment = 250 USDT
Total tokens in 60 days = 8.802 × 60 = 528.12 tokens
Required token price for 2-month ROI = 250 USDT / 528.12 tokens = 0.47 USDT/token
Daily USD earning = 8.802 tokens × 0.47 USDT = 4.14 USDT
```
