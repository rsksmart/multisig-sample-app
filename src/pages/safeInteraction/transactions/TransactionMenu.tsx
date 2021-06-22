import React from 'react'
import { TransactionStatus } from '../../../constants'

interface Interface {
  selected: TransactionStatus,
  handleClick: (tab: TransactionStatus) => void
}

const TransactionMenu: React.FC<Interface> = ({ handleClick, selected }) => {
  const MenuItem: React.FC<{name: TransactionStatus}> = ({ name }) =>
    <li>
      <button
        onClick={() => handleClick(name)}
        className={selected === name ? 'selected' : ''}
      >{name}</button></li>

  return (
    <ul className="inline">
      <MenuItem name={TransactionStatus.PENDING} />
      <MenuItem name={TransactionStatus.EXECUTED} />
      <MenuItem name={TransactionStatus.REJECTED} />
    </ul>
  )
}

export default TransactionMenu
