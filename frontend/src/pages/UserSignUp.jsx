import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {UsersDataContext} from '../context/UsersContext.jsx'


const UserSignUp = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {user, setUser} = useContext(UsersDataContext);

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newUser = {
      fullName : {
        firstName: firstName,
        lastName: lastName,
      }, 
      email: email,
      password: password,
    };

    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, newUser);

    if(response.status === 201) {
    const data = response.data;
    setUser(data.user);
    localStorage.setItem("token", (data.token));
    navigate("/home");
    }
 
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");

   
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10 "
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
          alt=""
        />
        <form onSubmit={(e) => handleSubmit(e)}>
          <h3 className="text-lg font-medium mb-2">What's your Name?</h3>
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

          <h3 className="text-lg font-medium mb-2">What's your Email?</h3>
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
            placeholder="Password"
            required
          />

          <button
            className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-sm"
            type="submit"
          >
            Create Account
          </button>

          <p className="mb-6 text-center">
            <span>Already have an account? </span>
            <Link to="/login" className="text-blue-600">
              Get in!
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
};

export default UserSignUp;
