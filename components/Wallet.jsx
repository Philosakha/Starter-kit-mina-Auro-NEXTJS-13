"use client"
import React, { useState, useEffect } from "react";
import WalletExist from "./WalletExist";
import { getAccountBalance } from "./getBalance";
import { useBalance } from "@/context/balance.context";
import { useWallet } from "@/context/wallet.context";

export default function Wallet({ children }) {
  const { isWalletConnected, connectWallet } = useWallet();
  const initialState = { accounts: [] };
  const [textUsed, setTextUsed] = useState("Connect Auro");
  const [wallet, setWallet] = useState(initialState);
  const [networkLive, setNetworkLive] = useState();
  const [accountBalance, setAccountBalance] = useState();
  const { updateBalance } = useBalance();

  let injectedProvider = false;
  if (typeof window.mina !== "undefined") {
    injectedProvider = true;
    console.log(window.mina);
  }
  const isAuro = injectedProvider ? window.mina : false;
  let isNetwork = null;

  useEffect(() => {
    // Define the event handler function
    function handleChainChanged() {
      setNetworkLive(window.mina.requestNetwork());
    }

    // Add the event listener when the component mounts
    window.mina.on("chainChanged", handleChainChanged);

    // Clean up the event listener when the component unmounts
    return () => {
      window.mina.off("chainChanged", handleChainChanged);
    };
  }, []); // An empty dependency array to run only once

  const updateWallet = async (accounts) => {
    setWallet({ accounts });
    console.log(wallet);
  };

  const handleConnect = async () => {
    connectWallet();
    let accounts = await window.mina.request({
      method: "mina_requestAccounts",
    });
    let isNetwork = await window.mina.request({
      method: "mina_requestNetwork",
    });
    console.log("The network is:", isNetwork);
    const network = await window.mina.requestNetwork();
    console.log("Accounts", accounts);
    updateWallet(accounts);
    const value = await getAccountBalance(accounts);
    console.log("Balance", typeof parseInt(value.account.balance.total));
    setAccountBalance(parseInt(value.account.balance.total));
    setTextUsed("Connected");
    setNetworkLive(network);
    updateBalance(parseInt(value.account.balance.total));
    console.log(networkLive);
  };

  useEffect(() => {
    if (isWalletConnected) {
      handleConnect();
    }
  }, [isWalletConnected]);

  return (
    <>
      <WalletExist />
      <div className="flex flex-row items-center justify-evenly">
        {!isWalletConnected && isAuro && (
          <button
            className="btn btn-outline btn-success"
            onClick={handleConnect}
          >
            {textUsed}
          </button>
        )}
        {isWalletConnected && textUsed === "Connected" && isAuro && (
          <div className="badge badge-primary badge-outline">{networkLive}</div>
        )}
        {isWalletConnected && textUsed === "Connected" && isAuro && (
          <div className="badge badge-primary badge-outline">
            {wallet.accounts.length > 0 && wallet.accounts[0]}
          </div>
        )}
        {isWalletConnected && textUsed === "Connected" && isAuro && (
          <div className="badge badge-primary badge-outline">
            {wallet.accounts.length > 0 && `${accountBalance} MINA`}
          </div>
        )}
      </div>
      {children}
    </>
  );
}
