import React from 'react'
import Modal from '../../../components/Modal'

interface Interface {
  handleClose: () => void
}

const PublishedModal: React.FC<Interface> = ({ handleClose }) => {
  return (
    <Modal handleClose={handleClose}>
      <h2>Transaction Published</h2>
      <p>The transaction has been published to the service for others to see.</p>
    </Modal>
  )
}

export default PublishedModal
