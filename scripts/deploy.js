import { ethers } from "hardhat";

async function main(){
    const ChatApp = await ethers.getContractFactory("ChatApp");
    const chatApp = await ChatApp.deploy();

    await chatApp.deployed();
}

main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
})