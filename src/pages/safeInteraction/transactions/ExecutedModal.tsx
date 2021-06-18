import React from 'react'
import LoadingComponent from '../../../components/LoadingComponent'
import Modal from '../../../components/Modal'
import ViewExplorerButton from '../../../components/ViewExplorerButton'

interface Interface {
  handleClose: () => void
  status: { hash?: string, status?: string }
}

const ExecutedModal: React.FC<Interface> = ({ handleClose, status }) => {
  if (status.status === 'LOADING') {
    return (
      <Modal>
        <LoadingComponent text="Executing the transaction." hash={status.hash} />
      </Modal>
    )
  }

  return (
    <Modal handleClose={handleClose}>
      <h2>Transaction executed</h2>
      <p>This is the hash of the transaction:</p>
      <p>
        <span className="readonly">{status.hash}</span>
        <ViewExplorerButton tx={status.hash} />
      </p>
      <p><button onClick={handleClose}>Close modal</button></p>
    </Modal>
  )
}

export default ExecutedModal
