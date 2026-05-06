import React, { useRef } from 'react'

export default function FocusInput() {
  const inputRef = useRef(null)

  const handleFocus = () => {
    inputRef.current.focus()
  }

  return (
    <div className="p-5">
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter text"
        className="border p-2 mr-2"
      />
      <button onClick={handleFocus} className="bg-blue-500 text-white px-3 py-1">
        Focus Input
      </button>
    </div>
  )
}