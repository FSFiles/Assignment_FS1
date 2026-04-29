import React, { useState } from 'react'

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: ''
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData,[name]: value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem("userData", JSON.stringify(formData))
    console.log("Saved:", formData)
    setFormData({name: '',mobile: '',email: ''
    })
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <form 
        onSubmit={handleSubmit}
        className='flex flex-col justify-center items-center bg-green-600 h-80 w-80 gap-5 rounded-2xl'
      >
        <input type="text" name="name" placeholder='Enter the Name' value={formData.name}onChange={handleChange} className='border-2 rounded p-1'/>
        <input type="tel" name='mobile'placeholder='Enter the Mobile' value={formData.mobile} onChange={handleChange} className='border-2 rounded p-1'/>
        <input type="email" name='email' placeholder='Enter the Email' value={formData.email} onChange={handleChange} className='border-2 rounded p-1'/>
        <button  type="submit" className="rounded-2xl bg-red-600 p-2 text-white">Submit</button>
      </form>
    </div>
  )
}

export default Form