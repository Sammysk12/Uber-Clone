import { Link, Route } from "react-router-dom"

const Start = () => {
  return (
    <div>
       <div className=" bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1689106615268-0230fb3961d1?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 flex justify-between flex-col w-full">
        <img className="w-16 ml-8" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />
        <div className="bg-white pb-7 py-4 px-4">
            <h2 className="text-[30px] font-semibold">Get Started with Uber</h2>
            <Link to='/login' className=" flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5">Continue</Link>
        </div>
       </div>
    </div>
  )
}

export default Start