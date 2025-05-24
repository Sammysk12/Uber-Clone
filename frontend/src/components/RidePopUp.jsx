import React from 'react'

const RidePopUp = (props) => {
  return (
    <div>
        <h5
        className="p-3 right-0 text-2xl absolute top-0"
        onClick={() => props.setIsRidePopUpPanelOpen(false)}
      >
        <i className="ri-arrow-down-wide-fill"></i>
      </h5>
       <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>
       
        <div  className='flex items-center justify-between p-3 bg-yellow-300 rounded-lg'>
            <div className='flex items-center gap-3'>
                <img className='h-12 w-12 rounded-full object-cover' src="https://cdn-icons-png.flaticon.com/512/8583/8583437.png" alt="" />
                <h2 className='text-lg font-medium'>Harsh Patel</h2>
            </div>
            <h5 className='text-lg font-semibold'>2.2 KM</h5>
        </div>

       <div className="flex gap-2 justify-between flex-col items-center">

      <div className="w-full mt-5">
        <div className="flex items-center gap-5 p-3 border-b border-black/30">
        <i className="ri-map-pin-user-fill"></i>
        <div >
          <h3 className="text-lg font-medium">562/11-A,</h3>
          <p className="text-sm -mt-1 text-gray-600">ABC street, ABC, USA</p>
        </div>
        </div>

        <div className="flex items-center gap-5 p-3 border-b border-black/30">
          <i className="text-lg ri-map-pin-2-fill"></i>
        <div >
          <h3 className="text-lg font-medium">562/11-A,</h3>
          <p className="text-sm -mt-1 text-gray-600">ABC street, ABC, USA</p>
        </div>
        </div>
        
        <div className="flex items-center gap-5 p-3 ">
          <i className="ri-cash-line"></i>
        <div >
          <h3 className="text-lg font-medium">₹193.20</h3>
          <p className="text-sm -mt-1 text-gray-600">ABC street, ABC, USA</p>
        </div>
        </div>
      </div>

      <button onClick={console.log("Ride Confirmed")} className="w-full mt-5 bg-yellow-300 text-black font-semibold p-2 rounded-lg">Confirm ride</button>
      <button onClick={() => props.setIsRidePopUpPanelOpen(false)} className="w-full mt-1 bg-black text-white font-semibold p-2 rounded-lg">Ignore</button>
      </div>
    </div>
  )
}

export default RidePopUp