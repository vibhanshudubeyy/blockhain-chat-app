import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { CheckIfWalletConnected, ConnectWallet, ConnectingWithContract } from '@/Utils/apiFeature'

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({children}) => {
    //usestate
    const [account, setAccount] = useState("");
    const [username, setUsername] = useState("");
    const [friendLists, setFriendLists] = useState([]);
    const [friendMsg, setFriendMsg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [usersLists, setUserLists] = useState([]);
    const [error, setError] = useState("");

    // chat user data
    const [currentUsername, setCurrentUsername] = useState("");
    const [currentUserAddress, setCurrentUserAddress] = useState("");
    const router = useRouter();

    //fetch data time of page load
    const fetchData = async () => {
        try {
            // get contract
            const contract = await ConnectingWithContract();
            
            // get acc
            const connectAccount = await ConnectWallet();

            setAccount(connectAccount);

            //get username 
            const username = await contract.getUsername(connectAccount);
            setUsername(username);

            //get friendlist 
            const friendList = await contract.getMyFriendList();
            setFriendLists(friendList);

            // get all app user
            const userList = await contract.getAllAppuser();
            setUserLists(userList);
            
        } catch (error) {
            setError("Please install and connect your wallet");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    // read message

    const readMessage = async (friendAddress) => {
        try {
            const contract = await ConnectingWithContract();
            const read = await contract.readMessage(friendAddress);
            setFriendMsg(read);
        } catch (error) {
            setError("currently you have no messages");
        }
    };

    const createAccount = async (name, accountAddress) => {
        try {
            if(name || accountAddress) return setError("Name and AccountAddress, cannot be empty");

            const contract = await ConnectingWithContract();
            const getCreatedUser = await contract.createAccount(name);
            setLoading(true);
            await getCreatedUser.wait();
            setLoading(false);
            window.location.reload();
        } catch (error){
            setError("error while creating account");
        }
    };

    // add friend
    const addFriend = async (name, accountAddress) => {
        try {

            if(name || accountAddress) return setError("Please provide name and account address");

            const contract = await ConnectingWithContract();
            const addMyFriend = contract.addFriend(accountAddress, name);

            setLoading(true);
            await addMyFriend.wait();
            setLoading(false);
            window.location.reload();

            
        } catch (error) {
            setError("Something went wrong while adding the friend");
        }
    }

    // send message

    const sendMessage = async (accountAddress, message) => {
        try {
            if(message || address) return setError("please type your message");

            const contract = await ConnectingWithContract();
            const addMessage = await contract.sendMessage(accountAddress, message);
            setLoading(true);
            await addMessage.wait();
            setLoading(false);
            window.location.reload();
            
        } catch (error) {
            setError("something went wrong")
        }
    }

    // read userinfo

    const readUser = async (userAddress) => {
        const contract = await ConnectingWithContract();
        const username = await contract.getUsername(userAddress);
        setCurrentUsername(username);
        setCurrentUserAddress(userAddress);
    }
    
    return (
        <ChatAppContext.Provider
            value={{
                readMessage,
                createAccount,
                addFriend,
                sendMessage,
                readUser,
                account,
                username,
                friendLists,
                usersLists,
                friendMsg,
                loading,
                error,
                currentUserAddress,
                currentUsername
            }}
        >
            {children};
            </ChatAppContext.Provider>
    );
};