import React, { useState } from 'react'
import ThresholdDropdown from '../../../components/ThresholdDropdown'

interface Interface {
  numberOfOwners: number
  handleSubmit: (address: string, threshold: number) => void
  removeAddress: string
}

const RemoveOwnerModal: React.FC<Interface> = ({ numberOfOwners, handleSubmit, removeAddress }) => {
  const [threshold, setThreshold] = useState<number>(numberOfOwners - 1)

  return (
    <div>
      <h3>Are you sure</h3>
      <p>Are you sure you want to remove this owner?</p>
      <input type="text" defaultValue={removeAddress} />

      <p>
        <label>New threshold:</label>
        <ThresholdDropdown
          numberOfOwners={numberOfOwners - 1}
          value={threshold}
          onChange={(value: number) => setThreshold(value)} />
      </p>

      <p><button onClick={() => handleSubmit(removeAddress.toLowerCase(), threshold)}>Remove</button></p>
    </div>
  )
}

export default RemoveOwnerModal
