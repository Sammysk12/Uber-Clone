import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UsersDataContext } from "../context/UsersContext";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userData, setUserData] = useState();

  const {user, setUser} = useContext(UsersDataContext);
  const naivigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, userData);
    if(response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", (data.token));
      naivigate("/home");
    }
    
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
          <h3 className="text-lg font-medium mb-2">What's your Email?</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            required
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            type="Password"
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
            <span>New to Uber? </span>
            <Link to="/signup" className="text-blue-600">
              Create new Account
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="bg-[#ffd904] flex items-center justify-center text-black font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
