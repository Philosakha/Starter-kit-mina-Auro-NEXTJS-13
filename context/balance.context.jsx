"use client"
import { createContext, useState, useContext } from "react";

// Create a context with an initial balance of 0
const BalanceContext = createContext(0);

// Create a provider component that will wrap your app and manage the balance state
export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);

  const updateBalance = (newBalance) => {
    setBalance(newBalance);
  };

  return (
    <BalanceContext.Provider value={{ balance, updateBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

// Create a custom hook to easily access the balance and updateBalance function
export const useBalance = () => {
    const context = useContext(BalanceContext);
    if(!context){
        throw new Error("Not inside the provider!")
    }


  return context
};
