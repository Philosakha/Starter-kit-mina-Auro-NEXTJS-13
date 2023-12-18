import Image from 'next/image'
import Wallet from "../components/Wallet"
import Hero from '@/components/HERO'

export default function Home({children}) {
  if(children.lenght < 0) {throw new Error("The value is not defined")}else{
    return("value is defined ")
  }
  return (
    <>
     <BalanceProvider><Wallet >
          {children}
        </Wallet></BalanceProvider>
     <Hero />
    </>
  )
}
