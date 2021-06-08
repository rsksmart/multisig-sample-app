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
      <button type="button" className="icon" onClick={handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="none" fillRule="evenodd"><path d="M0 0H16V16H0z"></path><path className="icon-color" fillRule="nonzero" d="M10 10h3V3H8v1c1.105 0 2 .895 2 2v4zM6 4V3c0-1.105.895-2 2-2h5c1.105 0 2 .895 2 2v7c0 1.105-.895 2-2 2h-3v1c0 1.105-.895 2-2 2H3c-1.105 0-2-.895-2-2V6c0-1.105.895-2 2-2h3zM3 6v7h5V6H3z"></path></g></svg>
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
