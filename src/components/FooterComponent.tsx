import React from 'react'
import { version } from '../../package.json'

const FooterComponent: React.FC = () => {
  return (
    <section className="footer">
      <p>This is a sample app and should not be used with real funds.</p>
      <p>Copyright © 2021 IOV Labs. All rights reserved.</p>
      <p>Version: {version}</p>
    </section>
  )
}

export default FooterComponent
