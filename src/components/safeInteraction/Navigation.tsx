import React, { MouseEvent } from 'react'

interface Interface {
  handleLogout: () => void
  changeActive: (event: MouseEvent<HTMLButtonElement>) => void
  selected: string
}

const Navigation: React.FC<Interface> = ({ changeActive, handleLogout, selected }) => {
  return (
    <ul className="navigation">
      <li><button id="dashboard" className={selected === 'dashboard' ? 'selected' : ''} onClick={changeActive}>Dashboard</button></li>
      <li><button id="transactions" className={selected === 'transactions' ? 'selected' : ''} onClick={changeActive}>Transactions</button></li>
      <li className="logout"><button onClick={handleLogout}>Disconnect Wallet</button></li>
    </ul>
  )
}

export default Navigation
