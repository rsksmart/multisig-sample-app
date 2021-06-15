import React from 'react'
import Modal from '../../../components/Modal'
import ViewExplorerButton from '../../../components/ViewExplorerButton'

interface Interface {
  handleClose: () => void
  hash: string
}

const ApprovedModal: React.FC<Interface> = ({ hash, handleClose }) => {
  if (hash === 'LOADING') {
    return (
      <Modal>
        <h2>Approve transaction pending...</h2>
      </Modal>
    )
  }

  return (
    <Modal handleClose={handleClose}>
      <h2>Transaction Approved</h2>
      <p>Your signature has been added to this transaction! This is the hash of the transaction:</p>
      <p>
        <input type="text" defaultValue={hash} />
        <ViewExplorerButton tx={hash} />
      </p>
      <p><button onClick={handleClose}>Close modal</button></p>
    </Modal>
  )
}

export default ApprovedModal
