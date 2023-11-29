"use client"
import {useState,useEffect} from "react";
import WalletExist from "./WalletExist";
import { getAccountBalance } from "./getBalance";
import { useBalance } from "@/context/balance.context";


export default function Wallet({children}){
    const initialState = { accounts: [] }               /* New */
    const [textUsed,settextUsed] = useState("Connect Auro")
    const [wallet, setWallet] = useState(initialState)  /* New */
    const [networkLive,setnetworkLive] = useState()
    const [accountBalance,setAccountBalance] = useState();
    const {  updateBalance } = useBalance();
    
    let injectedProvider =  false
    if (typeof window.mina !== 'undefined') {
    injectedProvider = true
    console.log(window.mina)
    }
    const isAuro = injectedProvider ? window.mina : false
    let isNetwork = null;
    
    useEffect(() => {
        // Define the event handler function
        function handleChainChanged() {
          setnetworkLive(window.mina.requestNetwork());
        }
      
        // Add the event listener when the component mounts
        window.mina.on('chainChanged', handleChainChanged);
      
        // Clean up the event listener when the component unmounts
      }, []); // An empty de
    
    //To display all the accounts
    const updateWallet = async (accounts) => {     /* New */
    setWallet({ accounts })
    console.log(wallet)                          /* New */
    }     

    const handleConnect = async  () => {
       
        let accounts = await window.mina.request({
            method:"mina_requestAccounts"
        })
        let isNetwork = await window.mina.request({ method:"mina_requestNetwork"});
        console.log("The network is:",isNetwork);
        const network = await window.mina.requestNetwork();
        console.log("Accounts",accounts)
        updateWallet(accounts)
        const value = await getAccountBalance(accounts)
        console.log("Balance",typeof(parseInt(value.account.balance.total)));
        setAccountBalance(parseInt(value.account.balance.total))
        settextUsed("Connected")
        setnetworkLive(network)
        updateBalance(parseInt(value.account.balance.total))
        console.log(networkLive)
        
        
    }

    return (
        <>
            <WalletExist  />
            <div className="flex flex-row items-center justify-evenly">
                { isAuro && <button className="btn btn-outline btn-success" onClick={handleConnect}>{textUsed}</button>}
                {textUsed === "Connected" && isAuro   && <div className="badge badge-primary badge-outline">{networkLive}</div>}
                {textUsed === "Connected" && isAuro   && wallet.accounts.length > 0  && <div className="badge badge-primary badge-outline">{wallet.accounts[0]}</div>}
                {textUsed === "Connected" && isAuro   && wallet.accounts.length > 0  && <div className="badge badge-primary badge-outline">{accountBalance} MINA</div>}
            </div>
            {children}
        </>
    )
}