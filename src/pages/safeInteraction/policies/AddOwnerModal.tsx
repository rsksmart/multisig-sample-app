import { isAddress } from '@ethersproject/address'
import React, { useState } from 'react'
import ThresholdDropdown from '../../../components/ThresholdDropdown'

interface Interface {
  numberOfOwners: number
  handleSubmit: (newOwner: string, newThreshold: number) => void
  handleError: (err: Error) => void
}

const AddOwnerModal: React.FC<Interface> = ({ handleSubmit, handleError, numberOfOwners }) => {
  const [newOwner, setNewOwner] = useState<string>('')
  const [newThreshold, setNewThreshold] = useState<number>(numberOfOwners)

  const validateAddress = () => {
    isAddress(newOwner.toLowerCase())
      ? handleSubmit(newOwner.toLowerCase(), newThreshold)
      : handleError(new Error('Value is not an address.'))
  }

  return (
    <div className="modal">
      <h3>Add new owner</h3>
      <label>
        Address</label>
      <input type="text" className="newOwner" value={newOwner} onChange={evt => setNewOwner(evt.target.value)} />

      <label>New Threshold</label>
      <ThresholdDropdown
        numberOfOwners={numberOfOwners + 1}
        value={newThreshold}
        onChange={(value: number) => setNewThreshold(value)}
      />

      <p><button onClick={validateAddress}>Update</button></p>
    </div>
  )
}

export default AddOwnerModal
