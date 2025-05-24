import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainsDataContext } from "../context/CaptainsContext";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {captain, setCaptain} = useContext(CaptainsDataContext);

  const handleSubmit = async(e) => {
    e.preventDefault();
   
    const captain = {
      email: email,
      password,
    }


  
    // Send the data to the backend
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/captains/login`, captain,);
    if(response.status === 200){
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", (data.token));
      navigate("/captain-home");
    }
   


    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-20 mb-2"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
        />
        <div className="py-2">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h3 className="text-lg font-medium mb-2">What's your email?</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            required
          />

          <h3 className="text-lg font-medium mb-2">Enter password</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />

          <button
            className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            type="submit"
          >
            Login
          </button>

          <p className="mb-6 text-center">
            {" "}
            <span>Join a fleet? </span>
            <Link to="/captain-signup" className="text-blue-600">
              Register as a Captain
            </Link>
          </p>
        </form>

        </div>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-[#ffd904] flex items-center justify-center text-black font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
