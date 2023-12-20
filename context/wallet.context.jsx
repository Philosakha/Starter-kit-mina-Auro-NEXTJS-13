"use client"
import React, {createContext , useContext, useState} from "react";

const WalletContext = createContext();

export const WalletProvider = ({children}) =>{
    const [iseWalletConnected,setWalletConnected] = useState(false);

    const connectWallet = () => {
        setWalletConnected(true)
    }
    const disconnectWallet = () => {
        setWalletConnected(false)
    }
    
    return (
        <WalletContext.Provider value={{iseWalletConnected, connectWallet,disconnectWallet}}>{children}</WalletContext.Provider>
    )
}

export const useWallet = () => {
    return useContext(WalletContext);
  };