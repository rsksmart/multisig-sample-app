import React, { useEffect, useState } from 'react'
import { Safe, SafeTransaction } from '@gnosis.pm/safe-core-sdk'
import ValueWithButtons from '../../../components/ValueWithButtons'
import ChangeThresholdModal from './ChangeThresholdModal'
import AddOwnerModal from './AddOwnerModal'

interface Interface {
  safe: Safe
  handleError: (err: Error) => void
  addTransaction: (transaction: SafeTransaction) => void
}

const PolicyComponent: React.FC<Interface> = ({ safe, addTransaction, handleError }) => {
  const [owners, setOwners] = useState<string[]>([])
  const [threshold, setThreshold] = useState<number>(0)

  useEffect(() => {
    safe.getOwners().then((owners: string[]) => setOwners(owners))
    safe.getThreshold().then((result: number) => setThreshold(result))
  }, [safe])

  // Create transaction for changing the thresold:
  const changeThreshold = (newThreshold: number) =>
    safe.getChangeThresholdTx(newThreshold)
      .then((transaction: SafeTransaction) => addTransaction(transaction))
      .catch(handleError)

  // Add an owner and update threshold:
  const addOwner = (newOwner: string, newThreshold: number) =>
    safe.getAddOwnerTx(newOwner.toLowerCase(), newThreshold)
      .then((transaction: SafeTransaction) => addTransaction(transaction))
      .catch(handleError)

  return (
    <section className="section panel">
      <h2>Safe Policy</h2>
      <table>
        <tbody>
          <tr>
            <th>Owners</th>
            <td>
              <ul>
                {owners.map((owner: string) => <li key={owner} ><ValueWithButtons value={owner} /></li>)}
              </ul>
            </td>
          </tr>
          <tr className="text">
            <th>Threshold</th>
            <td>{threshold}</td>
          </tr>
        </tbody>
      </table>

      {threshold && <ChangeThresholdModal numberOfOwners={owners.length} currentThreshold={threshold} handleSubmit={changeThreshold} />}

      <AddOwnerModal numberOfOwners={owners.length} handleSubmit={addOwner} />
    </section>
  )
}

export default PolicyComponent
