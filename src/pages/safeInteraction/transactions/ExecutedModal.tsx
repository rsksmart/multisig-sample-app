import React from 'react'
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
        <h2>Transaction pending...</h2>
      </Modal>
    )
  }

  return (
    <Modal handleClose={handleClose}>
      <h2>Transaction executed</h2>
      <p>This is the hash of the transaction:</p>
      <p>
        <input type="text" defaultValue={hash} />
        <ViewExplorerButton address={hash} />
      </p>
      <p><button onClick={handleClose}>Close modal</button></p>
    </Modal>
  )
}

export default ExecutedModal
