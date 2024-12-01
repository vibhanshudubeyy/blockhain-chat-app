const { ethers } = require("hardhat");

async function main() {
    // Get the contract factory
    const ChatApp = await ethers.getContractFactory("ChatApp");
    
    // Deploy the contract
    const chatApp = await ChatApp.deploy();

    // Wait for deployment to complete
    await chatApp.waitForDeployment();

    // Get the deployed contract address
    const contractAddress = await chatApp.getAddress();

    console.log(`Contract deployed to: ${contractAddress}`);
}

// Handle errors
main().catch((error) => {
    console.error("Error deploying contract:", error);
    process.exitCode = 1;
});
