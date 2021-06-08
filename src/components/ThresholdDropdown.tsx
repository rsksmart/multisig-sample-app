import React from 'react'

interface Interface {
  value: number
  onChange: (value: number) => void
  numberOfOwners: number
}

const ThresholdDropdown: React.FC<Interface> = ({ value, onChange, numberOfOwners }) => {
  const options = []
  for (let index = 1; index <= numberOfOwners; index++) {
    options.push(index)
  }

  const handleChange = (evt: any) => onChange(parseInt(evt.target.value))

  return (
    <select value={value} onChange={handleChange}>
      {options.map((number: number) => <option key={number} value={number}>{number}</option>)}
    </select>
  )
}

export default ThresholdDropdown
