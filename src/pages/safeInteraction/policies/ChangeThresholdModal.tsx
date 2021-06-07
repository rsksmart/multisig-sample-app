import React, { useState } from 'react'

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
    <div className="modal">
      <h3>Change threshold</h3>
      <p>Change the number of approvers for a transaction to be executed</p>
      <label>
        New threshold:
        <select value={newThreshold} onChange={evt => setNewThreshold(parseInt(evt.target.value))}>
          {options.map((number: number) => <option key={number}>{number}</option>)}
        </select>
      </label>
      <p><button onClick={() => handleSubmit(newThreshold)}>Change threshold</button></p>
    </div>
  )
}

export default ChangeThresholdModal
