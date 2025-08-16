# Clean-coin-77
https://domvill77.github.io/cleancoin77-transparency/
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CleanCoin77", function () {
  it("deploys with name/symbol and mints to founder", async function () {
    const [founder] = await ethers.getSigners();
    const name = "CleanCoin77";
    const symbol = "CC77";
    const initialSupply = 77_000_000n; // whole tokens, 18 decimals added in constructor

    const Factory = await ethers.getContractFactory("CleanCoin77");
    const token = await Factory.deploy(name, symbol, founder.address, initialSupply);
    await token.waitForDeployment();

    expect(await token.name()).to.equal(name);
    expect(await token.symbol()).to.equal(symbol);
    const decimals = await token.decimals();
    const expected = initialSupply * (10n ** BigInt(decimals));
    expect(await token.balanceOf(founder.address)).to.equal(expected);
    expect(await token.totalSupply()).to.equal(expected);
  });
});

# CleanCoin Transparency Toolkit

Hardcoded Founder: **Dominic D. Villanueva**  
Project: **CleanCoin77**  
Founder Ethereum Address: **0xC81225d0be2965AdFaC415D4B5F69617635de6ad**

## What this does
- Builds a **Markdown Clean Receipt™** from your deployment JSON log
- Inserts **Founder** and **Project** identity (hardcoded above)
- Appends a **Transparency & Security Statement** (tweaked wording)
- Computes **SHA256 checksum** of the report
- **Digitally signs** the checksum with the founder wallet (if run via Hardhat)
- **Optionally notarizes** the report hash on-chain (Sepolia or Mainnet)

## Files
- `scripts/finalize_receipt.js` — generates the Markdown receipt (+signature)
- `scripts/notarize_log.js` — puts the report hash on-chain and updates the MD with the tx link
- `clean_verified_badge.png` — your badge used at the top of the report

## Usage

1) Copy the `scripts/` folder and `clean_verified_badge.png` into your project.

2) After your normal deployment produces a JSON log (e.g., `deployment_log_*.json`), run:

```bash
# Generate Markdown + checksum + (optional) signature if run with Hardhat
FILE=deployment_log_*.json npx hardhat run scripts/finalize_receipt.js --network sepolia
# or without Hardhat (no signature, still fine for preview)
node scripts/finalize_receipt.js deployment_log_*.json
```

3) To notarize the Markdown on-chain (Sepolia by default unless you pass `--network mainnet`):
```bash
FILE=deployment_log_*.md npx hardhat run scripts/notarize_log.js --network sepolia
# Mainnet:
FILE=deployment_log_*.md npx hardhat run scripts/notarize_log.js --network mainnet
```

> The notarization sends a **zero-ETH transaction** from the founder wallet to the founder address with the report hash in calldata, then updates the Markdown with the **Etherscan link**.
>const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CleanCoin77", function () {
  it("deploys with name/symbol and mints to founder", async function () {
    const [founder] = await ethers.getSigners();
    const name = "CleanCoin77";
    const symbol = "CC77";
    const initialSupply = 77_000_000n; // whole tokens, 18 decimals added in constructor

    const Factory = await ethers.getContractFactory("CleanCoin77");
    const token = await Factory.deploy(name, symbol, founder.address, initialSupply);
    await token.waitForDeployment();

    expect(await token.name()).to.equal(name);
    expect(await token.symbol()).to.equal(symbol);
    const decimals = await token.decimals();
    const expected = initialSupply * (10n ** BigInt(decimals));
    expect(await token.balanceOf(founder.address)).to.equal(expected);
    expect(await token.totalSupply()).to.equal(expected);
  });
});
> 
