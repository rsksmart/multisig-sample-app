import React from 'react'
import { Screens } from '../../constants'

interface Interface {
  handleLogout: () => void
  changeActive: (screen: Screens) => void
  selected: Screens
}

const Navigation: React.FC<Interface> = ({ changeActive, handleLogout, selected }) => {
  const NavigationItem: React.FC<{ name: Screens }> = ({ name }) => {
    const toString = name.toString().toLowerCase()
    return (
      <li>
        <button
          style={{ textTransform: 'capitalize' }}
          className={selected === name ? `selected ${toString}` : toString}
          onClick={() => changeActive(name)}
        >{toString}</button>
      </li>
    )
  }

  return (
    <ul className="navigation">
      {[Screens.DASHBOARD, Screens.TRANSACTIONS, Screens.ASSETS, Screens.POLICY]
        .map((name: Screens) =>
          <NavigationItem key={name} name={name} />
        )}
      <li className="logout"><button onClick={handleLogout}>Disconnect Wallet</button></li>
    </ul>
  )
}

export default Navigation
