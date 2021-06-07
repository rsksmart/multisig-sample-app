import { Safe } from '@gnosis.pm/safe-core-sdk'
import React, { useEffect, useState } from 'react'
import ValueWithButtons from '../shared/ValueWithButtons'

interface Interface {
  safe: Safe
}

const Dashboard: React.FC<Interface> = ({ safe }) => {
  const [balance, setBalance] = useState<number>(0)

  useEffect(() => {
    safe.getBalance().then((balance: any) => setBalance(balance))
  }, [safe])

  return (
    <section className="panel">
      <h3>Safe Dashboard</h3>
      <table>
        <tbody>
          <tr>
            <th>Safe Address</th>
            <td><ValueWithButtons value={safe.getAddress()} /></td>
          </tr>
          <tr className="text">
            <th>Balance</th>
            <td>{(balance / 1000000000000000000).toString()}</td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}

export default Dashboard
