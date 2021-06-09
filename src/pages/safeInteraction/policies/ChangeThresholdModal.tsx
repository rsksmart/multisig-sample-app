import React, { useState } from 'react'
import ThresholdDropdown from '../../../components/ThresholdDropdown'

interface Interface {
  numberOfOwners: number
  currentThreshold: number
  handleSubmit: (newThreshold: number) => void
}

const ChangeThresholdModal: React.FC<Interface> = ({ numberOfOwners, currentThreshold, handleSubmit }) => {
  const [newThreshold, setNewThreshold] = useState<number>(currentThreshold)

  const options = []
  for (let index = 1; index <= numberOfOwners; index++) {
    options.push(index)
  }

  return (
    <div>
      <h3>Change threshold</h3>
      <p>Change the number of approvers for a transaction to be executed</p>
      <label>New threshold:</label>
      <ThresholdDropdown
        numberOfOwners={numberOfOwners}
        value={newThreshold}
        onChange={(value: number) => setNewThreshold(value)}
      />

      <p><button onClick={() => handleSubmit(newThreshold)}>Change threshold</button></p>
    </div>
  )
}

export default ChangeThresholdModal
