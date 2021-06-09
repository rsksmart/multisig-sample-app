import { Safe, SafeTransaction } from '@gnosis.pm/safe-core-sdk'
import React, { useState } from 'react'
import Modal from '../../../components/Modal'
import TransferValueModal, { NewTransaction } from './TransferValueModal'

interface Interface {
  safe: Safe
  handleError: (err: Error) => void
  addTransaction: (transaction: SafeTransaction) => void
}

const AssetsComponent: React.FC<Interface> = ({ safe, addTransaction, handleError }) => {
  const [showTransfer, setShowTransfer] = useState<boolean>(false)

  // Create transaction to send rbtc or data
  const createTransaction = (newTransaction: NewTransaction) =>
    safe.createTransaction({
      to: newTransaction.to.toLowerCase(),
      value: newTransaction.value,
      nonce: parseInt(newTransaction.nonce),
      data: newTransaction.data !== '' ? newTransaction.data : '0x'
    })
      .then((transaction: SafeTransaction) => addTransaction(transaction))
      .catch(handleError)

  return (
    <>
      <div className="panel">
        <h2>Assets</h2>
        <table>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><p>rBtc</p></td>
              <td>
                <p>1</p>
                <button onClick={() => setShowTransfer(true)}>transfer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {showTransfer && (
        <Modal handleClose={() => setShowTransfer(false)}>
          <TransferValueModal createTransaction={createTransaction} />
        </Modal>
      )}
    </>
  )
}

export default AssetsComponent
