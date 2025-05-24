import React from 'react'

const CaptainDetails = () => {
  return (
    <div>
         <div className='flex items-center justify-between p-2'>
          <div className='flex items-center gap-3'>
            <img className='w-10 h-10 rounded-full object-cover' src="https://cdn-icons-png.flaticon.com/512/8583/8583437.png" alt="" />
            <h4 className='text-lg font-medium'>Harsh Patel</h4>
          </div>

          <div className='pr-5'>
            <h4 className='text-xl font-semibold'>₹295.20</h4>
            <p className='text-sm text-gray-600 font-medium'>Earned</p>
          </div>

          </div>

          <div className='flex gap-5 justify-between items-center mt-8 p-3 bg-yellow-300 rounded-xl'>
            <div className='text-center'>
              <i className="text-2xl mb-2 font-thin ri-timer-2-line"></i>
              <h5 className='text-lg font-medium'>10.2</h5>
              <p className='text-sm text-gray-600'>Hours Online</p>
            </div>
            <div className='text-center'>
              <i className="text-2xl mb-2 font-thin ri-taxi-line"></i>
              <h5 className='text-lg font-medium'>5</h5>
              <p className='text-sm text-gray-600'>Rides Completed</p>
            </div>
            <div className='text-center'>
              <i className="text-2xl mb-2 font-thin ri-booklet-line"></i>
              <h5 className='text-lg font-medium'>2</h5>
              <p className='text-sm text-gray-600'>Pending Rides</p>
            </div>
          </div>
    </div>
  )
}

export default CaptainDetails