import React from 'react'
import LoadingComponent from '../../../components/LoadingComponent'
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
        <LoadingComponent text="Adding the signature to the transaction." />
      </Modal>
    )
  }

  return (
    <Modal handleClose={handleClose}>
      <h2>Transaction Approved</h2>
      <p>Your signature has been added to this transaction! This is the hash of the transaction:</p>
      <p>
        <span className="readonly">{hash}</span>
        <ViewExplorerButton tx={hash} />
      </p>
      <p><button onClick={handleClose}>Close modal</button></p>
    </Modal>
  )
}

export default ApprovedModal
