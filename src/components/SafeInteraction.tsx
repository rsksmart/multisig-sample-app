import React, { useState, useEffect } from 'react'
import EthersSafe, { SafeTransaction } from '@rsksmart/safe-core-sdk'
import ValueWithButtons from './shared/ValueWithButtons'
import { ethers } from 'ethers'

interface Interface {
  web3Provider: any
  safe: EthersSafe
}

const SafeInteraction: React.FC<Interface> = ({ web3Provider, safe }) => {
  const [safeAddress, setSafeAddress] = useState<string>('')
  const [balance, setBalance] = useState<number>(0)
  const [owners, setOwners] = useState<string[]>([])
  const [threshold, setThreshold] = useState<number>(0)

  useEffect(() => {
    safe.getBalance().then((balance: any) => setBalance(balance))
    safe.getOwners().then((owners: string[]) => setOwners(owners))
    setSafeAddress(safe.getAddress())
    safe.getThreshold().then((result: number) => setThreshold(result))
  }, [safe])

  const createTransaction = () => {
    console.log('heheheheheh!')
    const signer = new ethers.providers.Web3Provider(web3Provider).getSigner(0)
    console.log('signer', signer)

    EthersSafe.create(
      ethers,
      safeAddress,
      signer
    )
      .then((signerSafe: EthersSafe) => {
        console.log('signerSafe:', signerSafe)

        signerSafe.createTransaction({
          to: '0x3dd03d7d6c3137f1eb7582ba5957b8a2e26f304a',
          value: '10000', // ethers.BigNumber.from('10000').toString(),
          data: '0x'
        })
          .then((transaction: SafeTransaction) => {
            console.log('transaction', transaction)
            signerSafe.signTransaction(transaction)
              .then((result: any) => {
                console.log('it signed')
                // signerSafe.)
              })
              .catch((err: Error) => console.log('error3', err))
          })
          .catch((err: Error) => console.log('error2', err))
      })
  }

  return (
    <section className="selectedSafe">
      <h2>Connected to safe</h2>
      <section className="panel">
        <h3>Safe Information</h3>
        <dl>
          <dt>Safe Address</dt>
          <dd><ValueWithButtons value={safeAddress} /></dd>
          <dt>Balance</dt>
          <dd className="text">{(balance / 1000000000000000000).toString()}</dd>
          <dt>Owners</dt>
          {owners.map((owner: string) => <dd key={owner}><ValueWithButtons value={owner} /></dd>)}
          <dt>Threshold</dt>
          <dd className="text">{threshold}</dd>
        </dl>
      </section>

      <section className="panel">
        <h3>Transactions</h3>
        <button onClick={createTransaction}>Create Transaction</button>
      </section>
    </section>
  )
}

export default SafeInteraction
