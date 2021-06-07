import React, { useState } from 'react'
import { isAddress } from '@ethersproject/address'

interface Interface {
  connectAddress: string | null
  handleError: (error: Error) => void
  createSafe: (addresses: string[], threshold: number) => void
}

const CreateSafeComponent: React.FC<Interface> = ({ connectAddress, createSafe, handleError }) => {
  const [addresses, setAddresses] = useState<string[]>([connectAddress ? connectAddress.toLowerCase() : ''])
  const [threshold, setThreshold] = useState<number>(1)

  const changeAddressValue = (evt: any) => {
    const changeIndex = parseInt(evt.target.id.replace('address', ''))
    const updateList = addresses.map((item: string, index: number) => index === changeIndex ? evt.target.value.toLowerCase() : item)
    setAddresses(updateList)
  }

  const removeAddress = (changeIndex: number) => {
    const updateList = addresses.filter((_item: string, index: number) => index !== changeIndex)
    setAddresses(updateList)
  }

  const validateSafeSettings = () => {
    const errorList: number[] = []
    addresses.forEach((address: string, index: number) => {
      if (!isAddress(address)) {
        errorList.push(index + 1)
      }
    })

    if (errorList.length !== 0) {
      handleError(new Error(`Incorrect Addresses for: ${errorList.toString()}`))
      return false
    }

    createSafe(addresses, threshold)
  }

  const loopOptions = (length: number) => {
    const items = []
    for (let index = 0; index < length; index++) {
      items.push(<option key={index} value={index + 1}>{index + 1}</option>)
    }
    return items
  }

  return (
    <div>
      <h4>Create a new safe</h4>
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
              onChange={changeAddressValue}
              className={`address${index}`}
            />
            <button className={`removeAddress${index}`} onClick={() => removeAddress(index)}>delete</button>
          </li>
        ))}
      </ul>
      <button className="addAddress" onClick={() => setAddresses([...addresses, ''])}>Add address</button>

      <p>Transactions require the confirmation of at least
        <select className="threshold" value={threshold.toString()} onChange={evt => setThreshold(parseInt(evt.target.value))}>
          {loopOptions(addresses.length)}
        </select>
        signatures.
      </p>
      <button className="submit" disabled={addresses.length === 0} onClick={validateSafeSettings}>Create Safe</button>
    </div>
  )
}

export default CreateSafeComponent
