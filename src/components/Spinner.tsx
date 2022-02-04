import React from 'react'

function Spinner() {
  return (
    <div className='flex justify-center items-center absolute top-1/2 left-1/2'>
      <div className='animate-spin w-10 h-10 rounded-full spin'></div>
    </div>
  )
}

export default Spinner
