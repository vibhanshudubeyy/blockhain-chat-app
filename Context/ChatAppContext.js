import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { CheckIfWalletConnected, ConnectWallet, ConnectingWithContract } from '@/Utils/apiFeature'

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({children}) => {
    const title = "hey welcome to blockchain Chat App";

    return (
        <ChatAppContext.Provider value={{title}}>
            {children};
        </ChatAppContext.Provider>
    );
};