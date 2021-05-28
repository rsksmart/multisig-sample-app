import React, { useState } from 'react'
import { ethers } from 'ethers'
import EthersSafe, { EthersSafeFactory } from '@rsksmart/safe-core-sdk'
import { isAddress } from '@ethersproject/address'

interface Interface {
  web3Provider: any
  connectAddress: string | null
  setSafe: (safe: EthersSafe) => void
  handleError: (error: Error) => void
  switchView: () => void
}

const CreateSafe: React.FC<Interface> = ({ web3Provider, connectAddress, switchView, setSafe, handleError }) => {
  const [addresses, setAddresses] = useState<string[]>([connectAddress ? connectAddress.toLowerCase() : ''])
  const [threshold, setThreshold] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const changeAddressValue = (evt: any) => {
    const changeIndex = parseInt(evt.target.id.replace('address', ''))
    const updateList = addresses.map((item: string, index: number) => index === changeIndex ? evt.target.value.toLowerCase() : item)
    setAddresses(updateList)
  }

  const removeAddress = (changeIndex: number) => {
    const updateList = addresses.filter((_item: string, index: number) => index !== changeIndex)
    setAddresses(updateList)
  }

  const createSafe = () => {
    setIsLoading(true)

    const errorList: number[] = []
    addresses.forEach((address: string, index: number) => {
      if (!isAddress(address)) {
        errorList.push(index + 1)
      }
    })

    if (errorList.length !== 0) {
      setIsLoading(false)
      handleError(new Error(`Incorrect Addresses for: ${errorList.toString()}`))
      return false
    }

    const provider = new ethers.providers.Web3Provider(web3Provider)
    const signer = provider.getSigner()

    const safeSingletonAddress = '0xffd41b816f2821e579b4da85c7352bf4f17e4fa5'
    const proxyFactoryAddress = '0x5b836117aed4ca4dee8e2e464f97f7f59b426c5a'

    const safeFactory = new EthersSafeFactory(
      signer,
      proxyFactoryAddress,
      safeSingletonAddress
    )

    safeFactory.createSafe({ owners: addresses, threshold })
      .then((response: EthersSafe) => setSafe(response))
      .catch(handleError)
      .finally(() => setIsLoading(false))
  }

  const loopOptions = (length: number) => {
    const items = []
    for (let index = 0; index < length; index++) {
      items.push(<option key={index} value={index + 1}>{index + 1}</option>)
    }
    return items
  }

  return isLoading
    ? <div>Creating safe, please wait...</div>
    : (
      <section className="panel createSafe">
        <h3>
        Create a new safe
          <button onClick={switchView}>Connect to Safe</button>
        </h3>

        <p>
        A safe can have any number of owners associated with it. Your connected address has been added as the first account.<br/>
        Click the <em>Add address</em> button to add additional addresses, and the <em>delete button</em> to remove addresses.
        </p>

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

        <p>Transactions require the confirmation of at least
          <select value={threshold.toString()} onChange={evt => setThreshold(parseInt(evt.target.value))}>
            {loopOptions(addresses.length)}
          </select>
        signatures.
        </p>
        <button disabled={isLoading || addresses.length === 0} onClick={createSafe}>Create Safe!</button>
      </section>
    )
}

export default CreateSafe
