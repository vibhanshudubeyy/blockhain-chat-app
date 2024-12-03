import { ethers } from "ethers";
import Web3Modal from "web3modal";

import { ChatAppABI, ChatAppAddress } from "@/Context/constants";

export const CheckIfWalletConnected = async () =>{
    try{
        if(!window.ethereum) return console.log("Install Metamask");

        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });

    } catch(error){
        console.log(error);
    }
};

export const ConnectWallet = async () => {
    try {
        if(!window.ethereum) return console.group("Install MetaMask");

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        const firstAccount = accounts[0];
        return firstAccount;

    } catch (error) {
        console.log(error)
    }
};

const FetchContract = (signerOrProvider) => 
    new ethers.Contract(ChatAppAddress, ChatAppABI, signerOrProvider);

export const ConnectingWithContract = async () => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.BrowserProvider(connection);
        const signer = provider.getSigner();
        const contract = FetchContract(signer);
    } catch (error) {
        console.log(error);
    }
}

export const convertTime = (time) => {
    const newTime = new Date(time.toNumber());

    const realTime = newTime.getHours() + "/" 
    + newTime.getMinutes() + "/" 
    + newTime.getSeconds() + 
    " Date: " + 
    newTime.getDate() + 
    "/" + 
    (newTime.getMonth() + 1) +
    "/" + 
    newTime.getFullYear();

    return realTime;
}