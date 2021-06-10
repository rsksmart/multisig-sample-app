import React from 'react'
import Modal from './Modal'

interface Interface {
  closeModal: () => void
  changeScreen: () => void
}

const TransactionCreatedModal: React.FC<Interface> = ({ closeModal, changeScreen }) => {
  return (
    <Modal handleClose={closeModal}>
      <h2>Transaction Created</h2>
      <p>A transaction has been created and added to the transaction panel. You can sign the transaction there, and when enough signatures are collected, execute it.</p>
      <p>
        <button onClick={changeScreen}>View Transactions</button>
      </p>
    </Modal>
  )
}

export default TransactionCreatedModal
