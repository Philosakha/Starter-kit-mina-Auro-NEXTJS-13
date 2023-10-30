import Image from 'next/image'
import Wallet from "../components/Wallet"

export default function Home({children}) {
  return (
    <>
    <Wallet >
      {children}
    </Wallet>
    </>
  )
}
