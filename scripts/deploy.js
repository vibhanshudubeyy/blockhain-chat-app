const hre = require("hardhat")

async function main(){
    const Lock = await hre.ethers.getContractFactory("Lock");
    const lock = await Lock.deploy();

    await lock.deployed();

    console.log(
        `Lock with 1 ETH and unlock timestamep ${unlockTime} deployed to ${lock.getAddress}`
    );
}

main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
})