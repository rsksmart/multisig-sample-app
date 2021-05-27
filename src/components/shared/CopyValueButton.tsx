import React, { useRef } from 'react'

interface CopyButtonInterface {
  value: string
}

const CopyButton: React.FC<CopyButtonInterface> = ({ value }) => {
  const copyTextField = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    copyTextField.current && copyTextField.current.select()
    document.execCommand('copy')
  }

  return (
    <span className="copyButton">
      <button type="button" onClick={handleClick}>
        copy
      </button>

      <input
        type="text"
        className="copyText"
        defaultValue={value}
        ref={copyTextField}
        style={{ position: 'absolute', left: '-10000px' }}
      />
    </span>
  )
}

export default CopyButton
