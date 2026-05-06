import React, { useRef } from 'react'

export default function ClearInput() {
  const inputRef = useRef()

  const clearInput = () => {
    inputRef.current.value = ''
  }

  return (
    <div className="p-5">
      <input
        ref={inputRef}
        type="text"
        placeholder="Type something"
        className="border p-2 mr-2"
      />
      <button onClick={clearInput} className="bg-red-500 text-white px-3 py-1">
        Clear
      </button>
    </div>
  )
}