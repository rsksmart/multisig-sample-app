import React, { useState, useEffect } from 'react'
import EthersSafe from 'jesse-safe-core-sdk'
import CopyValueButton from './shared/CopyValueButton'
import ViewExplorerButton from './shared/ViewExplorerButton'
import ValueWithButtons from './shared/ValueWithButtons'

interface Interface {
  safe: EthersSafe
}

const SafeInteraction: React.FC<Interface> = ({ safe }) => {
  const [safeAddress, setSafeAddress] = useState<string>('')
  const [balance, setBalance] = useState<number>(0)
  const [owners, setOwners] = useState<string[]>([])

  useEffect(() => {
    safe.getBalance().then((balance: any) => setBalance(balance))
    safe.getOwners().then((owners: string[]) => setOwners(owners))
  }, [])

  useEffect(() => {
    setSafeAddress(safe.getAddress())
  }, [])

  return (
    <section className="selectedSafe">
      <h2>Connected to safe</h2>

      <table>
        <tr>
          <th>Safe Address</th>
          <td><ValueWithButtons value={safeAddress} /></td>
        </tr>
        <tr>
          <th>Balance</th>
          <td>{(balance / 1000000000000000000).toString()}</td>
        </tr>
        <tr>
          <th>Owners</th>
          <td>
            {owners.map((owner: string) => <ValueWithButtons key={owner} value={owner} />)}
          </td>
        </tr>
      </table>
    </section>
  )
}

export default SafeInteraction
