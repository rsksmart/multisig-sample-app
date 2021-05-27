import React, { useState, useEffect } from 'react'
import EthersSafe from 'jesse-safe-core-sdk'
import CopyValueButton from './shared/CopyValueButton'
import ViewExplorerButton from './shared/ViewExplorerButton'

interface Interface {
  safe: EthersSafe
}

const SafeInteraction: React.FC<Interface> = ({ safe }) => {
  const [balance, setBalance] = useState<number>(0)
  const [safeAddress, setSafeAddress] = useState<string>('')

  useEffect(() => {
    safe.getBalance().then((balance: any) => setBalance(balance))
  }, [])

  useEffect(() => {
    setSafeAddress(safe.getAddress())
  }, [])

  return (
    <section className="selectedSafe">
      <h2>Connected to safe</h2>
      <p><strong>Safe Address: </strong>
        {safeAddress}
        <CopyValueButton value={safeAddress} />
        <ViewExplorerButton address={safeAddress} />
      </p>
      <p><strong>Safe Balance: </strong>{(balance / 1000000000000000000).toString()}</p>
    </section>
  )
}

export default SafeInteraction
