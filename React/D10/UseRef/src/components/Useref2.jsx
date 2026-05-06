import React, { useRef } from 'react'

export default function GetInputValue() {
  const inputRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputRef.current.value)
  }

  return (
    <form onSubmit={handleSubmit} className="p-5">
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter name"
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-green-500 text-white px-3 py-1">
        Submit
      </button>
    </form>
  )
}