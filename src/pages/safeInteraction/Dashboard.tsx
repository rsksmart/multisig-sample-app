import { Safe } from '@gnosis.pm/safe-core-sdk'
import React, { useEffect, useState } from 'react'
import ValueWithButtons from '../../components/ValueWithButtons'
import refreshIcon from '../../images/refresh.svg'

interface Interface {
  safe: Safe
}

const Dashboard: React.FC<Interface> = ({ safe }) => {
  const [balance, setBalance] = useState<number>(0)
  const [nonce, setNonce] = useState<number | null>(null)

  useEffect(() => {
    getBalance()
    getNonce()
  }, [safe])

  const getBalance = () => safe.getBalance().then((balance: any) => setBalance(balance))
  const getNonce = () => safe.getNonce().then((nonce: number) => setNonce(nonce))

  return (
    <section className="panel">
      <h2>Safe Dashboard</h2>
      <table>
        <tbody>
          <tr>
            <th>Safe Address</th>
            <td><ValueWithButtons value={safe.getAddress()} /></td>
          </tr>
          <tr className="text">
            <th>Balance</th>
            <td>
              {(balance / 1000000000000000000).toString()}
              <button onClick={getBalance} className="icon"><img src={refreshIcon} alt="Refresh" /></button>
            </td>
          </tr>
          {nonce && (
            <tr className="text">
              <th>Nonce</th>
              <td>
                {nonce.toString()}
                <button onClick={getNonce} className="icon"><img src={refreshIcon} alt="Refresh" /></button>
              </td>
            </tr> 
          )}
        </tbody>
      </table>
    </section>
  )
}

export default Dashboard
