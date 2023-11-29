"use client"
import { useBalance } from "@/context/balance.context";


export default function Newpage(){
    const {balance} = useBalance();

    return (
        <>
            <h1>The value of the current balance is {balance}</h1>
        </>
    )

}