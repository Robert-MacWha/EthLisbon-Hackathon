const { ethers } = require("hardhat");

async function main() {

    const _contract = await ethers.getContractFactory("test_token");
    const test_token_contract_acc = await test_token_contract.deploy();

    await test_token_contract_acc.deployed();
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});