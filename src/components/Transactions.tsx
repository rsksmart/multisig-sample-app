import EthersSafe, { SafeTransaction } from '@rsksmart/safe-core-sdk'
import { ethers } from 'ethers'
import React, { useEffect } from 'react'

interface Interface {
  safeAddress: string
  web3Provider: any
}

const Transactions: React.FC<Interface> = ({ safeAddress, web3Provider }) => {
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
            signerSafe.getTransactionHash(transaction)
              .then((hash : string) => {
                console.log('the hash', hash)

                signerSafe.approveTransactionHash(hash)
                  .then((result: any) => console.log('result!', result))
                  .catch((err: Error) => console.log('error4', err))
              })
              .catch((err: Error) => console.log('error3', err))
          })
          .catch((err: Error) => console.log('error2', err))
      })
  }

  useEffect(() => {
    const safe = EthersSafe.create(
      ethers,
      safeAddress,
      new ethers.providers.Web3Provider(web3Provider).getSigner(0)
    ).then((safe: EthersSafe) => {
      console.log(safe)
    })
  }, [])

  return (
    <section className="panel">
      <h3>Transactions</h3>
      <h4>Pending Transactions</h4>

      <button onClick={createTransaction}>Create Transaction</button>
    </section>
  )
}

export default Transactions
