import React from 'react'
import loadingImage from '../images/loading.svg'

interface Interface {
  text?: string
}

const LoadingComponent: React.FC<Interface> = ({ text }) => {
  return (
    <div className="loading">
      <p><img src={loadingImage} alt="Loading..." /></p>
      {text && <p>{text}</p>}
    </div>
  )
}

export default LoadingComponent
