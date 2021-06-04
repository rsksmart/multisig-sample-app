import React, { useState } from 'react'

interface Interface {
  connectToSafe: (safeAddress: string) => void
}

const ConnectToSafeComponent: React.FC<Interface> = ({ connectToSafe }) => {
  const [safeAddress, setSafeAddress] = useState<string>('0xFa5C0Ff042F54158613D755d5a61c1A00dD1ccE1')

  return (
    <div>
      <h3>Connect to an existing safe</h3>
      <label>Safe address</label>
      <input className="safeAddress" type="text" value={safeAddress} onChange={evt => setSafeAddress(evt.target.value)} />
      <button className="connect" onClick={() => connectToSafe(safeAddress)}>Connect</button>
    </div>
  )
}

export default ConnectToSafeComponent
