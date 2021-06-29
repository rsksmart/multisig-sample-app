import React, { useEffect, useState } from 'react'
import { getKey, LocalStorageKeys } from '../../helpers/localStorage'

interface Interface {
  connectToSafe: (safeAddress: string) => void
}

const ConnectToSafeComponent: React.FC<Interface> = ({ connectToSafe }) => {
  const [safeAddress, setSafeAddress] = useState<string>('')
  const [pastSafes, setPastSafes] = useState<string[]>([])

  useEffect(() => {
    setPastSafes(getKey(LocalStorageKeys.SAFES))
  }, [])

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
