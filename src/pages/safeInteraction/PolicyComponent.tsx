import React, { useEffect, useState } from 'react'
import { Safe, SafeTransaction } from '@gnosis.pm/safe-core-sdk'
import ValueWithButtons from '../../components/ValueWithButtons'

interface Interface {
  safe: Safe
  handleError: (err: Error) => void
}

const PolicyComponent: React.FC<Interface> = ({ safe, handleError }) => {
  const [owners, setOwners] = useState<string[]>([])
  const [threshold, setThreshold] = useState<number>(0)

  useEffect(() => {
    safe.getOwners().then((owners: string[]) => setOwners(owners))
    safe.getThreshold().then((result: number) => setThreshold(result))
  }, [safe])

  const changeThreshold = () => {
    safe.getChangeThresholdTx(1)
      .then((transaction: SafeTransaction) => {
        console.log('good', transaction)
        // transaction.get
        safe.signTransaction(transaction)
          .then((result: any) => {
            console.log('signed', result)
            safe.executeTransaction(transaction)
              .then((result: any) => {
                console.log('result2', result)
              })
              .catch(handleError)
          })
          .catch(handleError)
      })
      .catch(handleError)
  }

  return (
    <section className="section panel">
      <h2>Safe Policy</h2>
      <table>
        <tbody>
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
      <button onClick={changeThreshold}>Change Threshold</button>
    </section>
  )
}

export default PolicyComponent
