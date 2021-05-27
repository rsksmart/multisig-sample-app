import React from 'react'
import CopyValueButton from './CopyValueButton'
import ViewExplorerButton from './ViewExplorerButton'

interface Interface {
  value: string
}

const ValueWithButtons: React.FC<Interface> = ({ value }) => {
  return (
    <>
      {value}
      <CopyValueButton value={value} />
      <ViewExplorerButton address={value} />
    </>
  )
}

export default ValueWithButtons
