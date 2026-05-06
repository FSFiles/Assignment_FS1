import React from 'react'

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      
      {/* Logo */}
      <h1 className="text-xl font-bold tracking-wide">
        MyApp
      </h1>

      {/* Links */}
      <ul className="flex gap-6 text-sm font-medium">
        <li className="hover:text-yellow-400 cursor-pointer">Home</li>
        <li className="hover:text-yellow-400 cursor-pointer">About</li>
        <li className="hover:text-yellow-400 cursor-pointer">Contact</li>
      </ul>

      {/* Button */}
      <button className="bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-300">
        Login
      </button>

    </nav>
  )
}