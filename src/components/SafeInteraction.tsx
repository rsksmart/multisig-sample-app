import React from 'react'
import EthersSafe from '@rsksmart/safe-core-sdk'

interface Interface {
  safe: EthersSafe
}

const SafeInteraction: React.FC<Interface> = ({ safe }) => {
  return (
    <section className="selectedSafe">
      <h2>Connected to safe</h2>
      <p><strong>Safe Address: </strong>{safe.getAddress()}</p>
    </section>
  )
}

export default SafeInteraction
