import React, { useState } from 'react'

interface Interface {
  connectToSafe: (safeAddress: string) => void
  pastSafes: string[]
}

const ConnectToSafeComponent: React.FC<Interface> = ({ connectToSafe, pastSafes }) => {
  const [safeAddress, setSafeAddress] = useState<string>('')

  return (
    <div>
      <h3>Connect to an existing safe</h3>
      <label>Safe address</label>
      <input className="safeAddress" type="text" value={safeAddress} onChange={evt => setSafeAddress(evt.target.value)} />
      <button className="connect" onClick={() => connectToSafe(safeAddress)}>Connect</button>

      {pastSafes && pastSafes.length !== 0 && (
        <>
          <h4>Past Safes:</h4>
          <ul>
            {pastSafes.map((address: string) => (
              <li key={address}>
                <button
                  className="icon"
                  onClick={() => connectToSafe(address)}>{address}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default ConnectToSafeComponent
