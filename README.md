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
