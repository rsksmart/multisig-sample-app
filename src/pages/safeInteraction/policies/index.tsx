import React, { useEffect, useState } from 'react'
import { Safe, SafeTransaction } from '@gnosis.pm/safe-core-sdk'
import ValueWithButtons from '../../../components/ValueWithButtons'
import ChangeThresholdModal from './ChangeThresholdModal'
import AddOwnerModal from './AddOwnerModal'
import RemoveOwnerModal from './RemoveOwnerModal'
import SwapOwnerModal from './SwapOwnerModal'
import Modal from '../../../components/Modal'
import deleteIcon from '../../../images/delete.svg'
import swapIcon from '../../../images/swap.svg'
import editIcon from '../../../images/edit.svg'

interface Interface {
  safe: Safe
  handleError: (err: Error) => void
  addTransaction: (transaction: SafeTransaction) => void
}

const PolicyComponent: React.FC<Interface> = ({ safe, addTransaction, handleError }) => {
  // Safe variables:
  const [owners, setOwners] = useState<string[]>([])
  const [threshold, setThreshold] = useState<number>(0)

  // UI components:
  const [addNewOwner, setAddNewOwner] = useState<boolean>(false)
  const [changeThreshold, setChangeThreshold] = useState<boolean>(false)
  const [removeOwner, setRemoveOwner] = useState<null | string>(null)
  const [swapOwner, setSwapOwner] = useState<null | string>(null)

  useEffect(() => {
    safe.getOwners().then((owners: string[]) => setOwners(owners))
    safe.getThreshold().then((result: number) => setThreshold(result))
  }, [safe])

  // Create transaction for changing the thresold:
  const changeThresholdFunction = (newThreshold: number) =>
    safe.getChangeThresholdTx(newThreshold)
      .then((transaction: SafeTransaction) => {
        addTransaction(transaction)
        afterTransaction()
      })
      .catch(handleError)

  // Add an owner and update threshold:
  const addOwnerFunction = (newOwner: string, newThreshold: number) =>
    safe.getAddOwnerTx(newOwner, newThreshold)
      .then((transaction: SafeTransaction) => {
        addTransaction(transaction)
        afterTransaction()
      })
      .catch(handleError)

  // remove an owner and update the threshold:
  const removeOwnerFunction = (removeOwner: string, newThreshold: number) =>
    safe.getRemoveOwnerTx(removeOwner, newThreshold)
      .then((transaction: SafeTransaction) => {
        addTransaction(transaction)
        afterTransaction()
      })
      .catch(handleError)

  // swap one owner for another:
  const swapOwnerFunction = (swapOwner: string, newOwner: string) =>
    safe.getSwapOwnerTx(swapOwner, newOwner)
      .then((transaction: SafeTransaction) => {
        addTransaction(transaction)
        afterTransaction()
      })
      .catch(handleError)

  // close ALL modals
  const afterTransaction = () => {
    setAddNewOwner(false)
    setChangeThreshold(false)
    setRemoveOwner(null)
    setSwapOwner(null)
  }

  return (
    <section className="section panel">
      <h2>Safe Policy</h2>
      <table>
        <tbody>
          <tr>
            <th>Owners</th>
            <td>
              <ul>
                {owners.map((owner: string) => (
                  <li key={owner} >
                    <ValueWithButtons value={owner} />
                    <button className="icon delete" onClick={() => setRemoveOwner(owner)}>
                      <img src={deleteIcon} alt="delete address" />
                    </button>
                    <button className="icon" onClick={() => setSwapOwner(owner)}>
                      <img src={swapIcon} alt="swap address" />
                    </button>
                  </li>
                ))}
              </ul>
              <button onClick={() => setAddNewOwner(true)}>+ Add Owner</button>
            </td>
          </tr>
          <tr className="text">
            <th>Threshold</th>
            <td>
              {threshold}
              <button className="icon" onClick={() => setChangeThreshold(true)}>
                <img src={editIcon} alt="edit threshold" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {changeThreshold && <Modal handleClose={() => setChangeThreshold(false)}><ChangeThresholdModal numberOfOwners={owners.length} currentThreshold={threshold} handleSubmit={changeThresholdFunction} /></Modal>}
      {addNewOwner && <Modal handleClose={() => setAddNewOwner(false)}><AddOwnerModal numberOfOwners={owners.length} handleSubmit={addOwnerFunction} handleError={handleError} /></Modal>}
      {removeOwner && <Modal handleClose={() => setRemoveOwner(null)}><RemoveOwnerModal removeAddress={removeOwner} numberOfOwners={owners.length} handleSubmit={removeOwnerFunction} /></Modal>}
      {swapOwner && <Modal handleClose={() => setSwapOwner(null)}><SwapOwnerModal oldAddress={swapOwner} handleSubmit={swapOwnerFunction} handleError={handleError} /></Modal>}
    </section>
  )
}

export default PolicyComponent
