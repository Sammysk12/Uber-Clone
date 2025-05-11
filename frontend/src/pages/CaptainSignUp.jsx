import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import {CaptainsDataContext} from '../context/CaptainsContext';
import { useContext } from 'react';
import axios from 'axios';

const CaptainSignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  //importing the context
  const {captain, setCaptain} = useContext(CaptainsDataContext);

  const navigate = useNavigate();


  const handleSubmit = async(e) => {
    e.preventDefault();
    const captainData = {
      fullName : {
        firstName: firstName,
        lastName: lastName,
      }, 
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    // Send the data to the backend
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/captains/register`, captainData,)

    if(response.status === 201){
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", (data.token));
      navigate("/captain-home");
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };

  return (
    <div className="py-5 px-5 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10 "
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
        />
        <form onSubmit={(e) => handleSubmit(e)}>
          <h3 className="text-lg font-medium mb-2 w-full">What's our Captain's Name?</h3>
          <div className="flex gap-3 mb-6">
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              required
            />
            <input
              className="bg-[#eeeeee]  rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
          </div>

          <h3 className="text-lg font-medium mb-2">What's our Captain's Email?</h3>
          <input
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            required
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
          <h3 className="text-lg font-medium mb-2">Vehicle Details</h3>
          <div className="mb-6 grid grid-cols-2 gap-3">
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 w-full text-lg placeholder:text-base mb-4"
              type="text"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              placeholder="Vehicle Color"
              required
            />
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 w-full text-lg placeholder:text-base mb-4"
              type="text"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              placeholder="Vehicle Plate"
              required
            />
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 w-full text-lg placeholder:text-base mb-4"
              type="number"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(Number(e.target.value))}
              placeholder="Vehicle Capacity"
              required
            />
            <select
              className="bg-[#eeeeee] rounded px-4 py-2 w-full text-lg placeholder:text-base mb-4"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <button
            className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-sm"
            type="submit"
          >
            Create Account
          </button>

          <p className="mb-6 text-center">
            <span>You drive already? </span>
            <Link to="/captain-login" className="text-blue-600">
              Lets Go!
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-[10px] leading-tight">
         This site is protected by reCAPTCHA and the <span className="underline">Google Privacy Policy</span> and <span className="underline">Terms of Service apply.</span>
        </p>
      </div>
    </div>
  );
}

export default CaptainSignUp