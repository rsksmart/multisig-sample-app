import React, { useState, useEffect } from 'react'
import EthersSafe from '@rsksmart/safe-core-sdk'
import ValueWithButtons from './shared/ValueWithButtons'
import Navigation from './Navigation'

interface Interface {
  web3Provider: any
  safe: EthersSafe
  handleLogout: () => void
}

const SafeInteraction: React.FC<Interface> = ({ safe, handleLogout }) => {
  const [safeAddress, setSafeAddress] = useState<string>('')
  const [balance, setBalance] = useState<number>(0)
  const [owners, setOwners] = useState<string[]>([])
  const [threshold, setThreshold] = useState<number>(0)

  useEffect(() => {
    safe.getBalance().then((balance: any) => setBalance(balance))
    safe.getOwners().then((owners: string[]) => setOwners(owners))
    setSafeAddress(safe.getAddress())
    safe.getThreshold().then((result: number) => setThreshold(result))
  }, [safe])

  return (
    <section className="selectedSafe">
      <Navigation handleLogout={handleLogout} />
      <section className="panel">
        <h3>Safe Information</h3>
        <table>
          <tbody>
            <tr>
              <th>Safe Address</th>
              <td><ValueWithButtons value={safeAddress} /></td>
            </tr>
            <tr className="text">
              <th>Balance</th>
              <td>{(balance / 1000000000000000000).toString()}</td>
            </tr>
            <tr>
              <th>Owners</th>
              <td>
                {owners.map((owner: string) => <div key={owner} ><ValueWithButtons value={owner} /></div>)}
              </td>
            </tr>
            <tr className="text">
              <th>Threshold</th>
              <td>{threshold}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>
  )
}

export default SafeInteraction
