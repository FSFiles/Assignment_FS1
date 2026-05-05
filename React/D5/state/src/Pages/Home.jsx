import React from 'react';

const Home =()=>{
    return(
        <>
        <div className="bg-blue-600 flex justify-center items-center h-170 flex-col gap-5">
            <h1 className='text-4xl font-bold text-white'>Hi Leon!!</h1>
        
        <div className="flex justify-between gap-70 ">
  <div >
    <h2 className="text-3xl font-extrabold text-gray-900">Educations</h2>
    <p className="text-gray-600 leading-relaxed">We provide cutting-edge designs that help your business scale faster. 
        <p>This layout stacks on mobile and splits on medium screens.</p>
    </p>
  </div>
  <div>
    <img src="./public/Side.jpg" alt="Feature" className="rounded-xl shadow-lg w-50 h-50" />
  </div>
</div>
<form className="bg-gray-100 p-8 rounded-lg gap-6 flex flex-col">
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
    <input type="text" placeholder="Enter your name" className="w-full px-4 py-2 border border-gray-300 rounded-md " />
  </div>
  
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
    <input type="email" placeholder="Enter your email" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
  </div>

  <button type="submit" className="w-full bg-blue-600 text-white font-bold p-2 rounded-md ">
    Submit Entry
  </button>
</form>
</div>


        </>
    )
}
export default Home;