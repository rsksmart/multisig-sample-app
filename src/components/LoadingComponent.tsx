import React from 'react'
import loadingImage from '../images/loading.svg'
import ViewExplorerButton from './ViewExplorerButton'

interface Interface {
  text?: string
  hash?: string
}

const LoadingComponent: React.FC<Interface> = ({ text, hash }) => {
  return (
    <div className="loading">
      <p><img src={loadingImage} alt="Loading..." /></p>
      {(text || hash) && (
        <p>
          {text}
          {hash && <> View it on the explorer <ViewExplorerButton tx={hash} /></>}
        </p>
      )}
    </div>
  )
}

export default LoadingComponent
