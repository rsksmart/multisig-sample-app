import React from 'react'

const FooterComponent: React.FC = () => {
  return (
    <section className="footer">
      <p>This is a sample app and does not save transactions outside of the state. If you refresh the app, or log in with a different account, the transactions will be cleared.</p>
      <p>Copyright © 2021 IOV Labs. All rights reserved.</p>
    </section>
  )
}

export default FooterComponent