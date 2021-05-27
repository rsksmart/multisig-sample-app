import React, { useState } from 'react'
import { ethers } from 'ethers'
import EthersSafe, { EthersSafeFactory } from '@rsksmart/safe-core-sdk'

interface Interface {
  web3Provider: any
  setSafe: (safe: EthersSafe) => void
  handleError: (error: Error) => void
}

const CreateSafe: React.FC<Interface> = ({ web3Provider, setSafe, handleError }) => {
  const [addresses, setAddresses] = useState<string[]>([''])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const changeAddressValue = (evt: any) => {
    const changeIndex = parseInt(evt.target.id.replace('address', ''))
    const updateList = addresses.map((item: string, index: number) => index === changeIndex ? evt.target.value : item)
    setAddresses(updateList)
  }

  const removeAddress = (changeIndex: number) => {
    const updateList = addresses.filter((_item: string, index: number) => index !== changeIndex)
    setAddresses(updateList)
  }

  const createSafe = () => {
    setIsLoading(true)

    const provider = new ethers.providers.Web3Provider(web3Provider)
    const signer = provider.getSigner()

    const safeSingletonAddress = '0xffd41b816f2821e579b4da85c7352bf4f17e4fa5'
    const proxyFactoryAddress = '0x5b836117aed4ca4dee8e2e464f97f7f59b426c5a'

    const safeFactory = new EthersSafeFactory(
      signer,
      proxyFactoryAddress,
      safeSingletonAddress
    )

    safeFactory.createSafe({ owners: addresses, threshold: 2 })
      .then((response: EthersSafe) => setSafe(response))
      .catch(handleError)
  }

  return (
    <div>
      <h3>Create a safe</h3>
      <ul>
        {addresses.map((address: string, index: number) => (
          <li key={index}>
            <label>Address {index + 1}: </label>
            <input type="text"
              id={`address${index}`}
              value={address}
              onChange={changeAddressValue} />
            <button disabled={isLoading} onClick={() => removeAddress(index)}>delete</button>
          </li>
        ))}
      </ul>

      <button disabled={isLoading} onClick={() => setAddresses([...addresses, ''])}>Add address</button>
      <button disabled={isLoading} onClick={createSafe}>Create Safe!</button>
    </div>
  )
}

export default CreateSafe
