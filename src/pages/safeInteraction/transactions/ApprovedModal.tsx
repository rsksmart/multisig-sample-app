import React from 'react'
import Modal from '../../../components/Modal'
import ViewExplorerButton from '../../../components/ViewExplorerButton'

interface Interface {
  handleClose: () => void
  hash: string
}

const ApprovedModal: React.FC<Interface> = ({ hash, handleClose }) => {
  return (
    <Modal handleClose={handleClose}>
      <h2>Transaction Approved</h2>
      <p>Your signature has been added to this transaction! This is the hash of the transaction:</p>
      <p>
        <input type="text" defaultValue={hash} />
        <ViewExplorerButton address={hash} />
      </p>
      <p>Once it has been confirmed on the blockchain, you will see it under approvals.</p>
      <p><button onClick={handleClose}>Close modal</button></p>
    </Modal>
  )
}

export default ApprovedModal
