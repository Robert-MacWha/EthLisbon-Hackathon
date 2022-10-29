const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("@nomicfoundation/hardhat-chai-matchers");
const { inputToConfig } = require("@ethereum-waffle/compiler");

describe("lol testing it... Not much more of a descriptive name :P", function () {

    let deployer;
    let user2;
    let user3;
    let moneyGrabContract;

    before(async function () {
        [deployer, user2, user3] = await ethers.getSigners();

        const frontrunner_bot_seller = await ethers.getContractFactory("frontrunner_bot_seller");
        frontrunner_bot_sellerContract = await frontrunner_bot_seller.deploy();
    });

    describe("testing all basic functions", function () {

        it("withdraw stuff lol", async function () {
            let balance_user2_before = await ethers.provider.getBalance(user2.address);
            let tx1 = await moneyGrabContract.connect(user2).withdraw("fdjfioewjioj2jrjwefsicosjfwes");
            let balance_user2_after = await ethers.provider.getBalance(user2.address);
            console.log(tx1);
            console.log(balance_user2_before, balance_user2_after);
            expect(balance_user2_after).to.be.greaterThan(balance_user2_before);
        })
    })

})