import React from 'react'

interface Interface {
  handleLogout: () => void
}

const Navigation: React.FC<Interface> = ({ handleLogout }) => {
  return (
    <ul className="navigation">
      <li className="selected">Dashboard</li>
      <li className="logout"><button onClick={handleLogout}>Disconnect Wallet</button></li>
    </ul>
  )
}

export default Navigation
