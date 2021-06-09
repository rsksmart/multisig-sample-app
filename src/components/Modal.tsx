import React, { ReactNode } from 'react'

interface Interface {
  handleClose?: () => void
  children: ReactNode
}

const Modal: React.FC<Interface> = ({ handleClose, children }) => {
  return (
    <div className="modal">
      <div className="modalBody">
        <div className="modalHeader">
          {handleClose && <button className="close" onClick={handleClose}>x</button>}
        </div>
        <div className="modalContent">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
