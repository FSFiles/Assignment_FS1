import React, { useState } from 'react';

const Task6 = () => {
  const [number, setNumber] = useState("");

  const handleChange = (e) => {
    setNumber(e.target.value);
  };

  return (
    <>
      <div className='bg-blue-950 text-amber-500 text-center flex justify-center items-center h-100 w-100'>
        <div className='flex flex-col justify-center items-center gap-5'>  
          <input type="text"onChange={handleChange} className='bg-emerald-600 text-white'/>
          <h2>
            {number === "" ? "" : number % 2 === 0 ? "Even" : "Odd"}
          </h2>
        </div>
      </div>
    </>
  );
};

export default Task6;