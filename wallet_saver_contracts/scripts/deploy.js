const { ethers } = require("hardhat");

async function main() {

    const wallet_saver_contract = await ethers.getContractFactory("wallet_saver_queue");
    const wallet_saver_contract_acc = await wallet_saver_contract.deploy(100, "0x79e2514aac65d0359849b093c089756fc101b3be", "YOUR ADDRESS");
    console.log(wallet_saver_contract_acc.owner())

    await wallet_saver_contract_acc.deployed();
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});