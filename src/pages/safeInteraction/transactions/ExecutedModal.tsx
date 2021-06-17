import React from 'react'
import LoadingComponent from '../../../components/LoadingComponent'
import Modal from '../../../components/Modal'
import ViewExplorerButton from '../../../components/ViewExplorerButton'

interface Interface {
  handleClose: () => void
  hash: string
}

const ExecutedModal: React.FC<Interface> = ({ handleClose, hash }) => {
  if (hash === 'LOADING') {
    return (
      <Modal>
        <LoadingComponent text="Executing the transaction." />
      </Modal>
    )
  }

  return (
    <Modal handleClose={handleClose}>
      <h2>Transaction executed</h2>
      <p>This is the hash of the transaction:</p>
      <p>
        <input type="text" defaultValue={hash} />
        <ViewExplorerButton tx={hash} />
      </p>
      <p><button onClick={handleClose}>Close modal</button></p>
    </Modal>
  )
}

export default ExecutedModal
