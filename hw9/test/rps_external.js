const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RPS_external.sol", () => {
    let contractFactory;
    let contract;
    let targetContract;
    //let initialSupply;
    let owner;

    beforeEach(async () => {
        owner = "0x61dbFE8d0067f5B3F6082d0141C291f68083BA88";
        //initialSupply = ethers.utils.parseEther("100000");
        contractFactory = await ethers.getContractFactory("RPS_external");
        contract = await contractFactory.deploy();
        let MyContract = await ethers.getContractFactory("RPS_Logic");
        targetContract = await MyContract.attach(
        "0x6d4F10372755ad1420879926945DA8B15Fd5015e" // The target contract address
        );
    });

    describe("Correct setup", () => {
        it("should be named 'RPS_external", async () => {
            const name = await contract.name;
            console.log(name);
            expect(name).to.equal("RPS_external");
        });
    });

    describe("Core", () => {
        it("playGame test", async () => {
            let balance = await targetContract.playerBalances(owner);
            console.log(owner);
            console.log(balance);
            contract.playGameExternal();
            expect(await targetContract.playerBalances(owner)).to.equal(balance + 1);
        });
    });
});