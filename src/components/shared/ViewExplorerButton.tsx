import React from 'react'

interface Interface {
  address: string
}

const ViewExplorerButton: React.FC<Interface> = ({ address }) => {
  return (
    <a
      href={`http://explorer.testnet.rsk.co/address/${address.toLowerCase()}`}
      target="_blank"
      rel="noreferrer"
      className="button"
    >
      Explorer
    </a>
  )
}

export default ViewExplorerButton
