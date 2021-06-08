import { isAddress } from '@ethersproject/address'
import React, { useState } from 'react'

interface Interface {
  handleError: (err: Error) => void
  handleSubmit: (oldOwner: string, newOwner: string) => void
  oldAddress: string
}

const SwapOwnerModal: React.FC<Interface> = ({ oldAddress, handleError, handleSubmit }) => {
  const [newOwner, setNewOwner] = useState<string>('')

  const validateAddress = () =>
    isAddress(newOwner)
      ? handleSubmit(oldAddress, newOwner.toLowerCase())
      : handleError(new Error('Address is not valid'))

  return (
    <div className="modal">
      <h2>Swap Address</h2>
      <p>Swap address for a new one.</p>
      <label>Old Address:</label>
      <input type="text" defaultValue={oldAddress} />
      <label>New Owner</label>
      <input type="text" className="newAddress" value={newOwner} onChange={evt => setNewOwner(evt.target.value)} />

      <p><button onClick={validateAddress}>Swap Address</button></p>
    </div>
  )
}

export default SwapOwnerModal
