import React from "react";
import { Link } from "react-router-dom";

const Riding = () => {
  return (
    <div className="h-screen">
        <Link to='/home' className="fixed h-10 w-10 bg-white flex items-center justify-center rounded-full top-5 left-5">
            <i className="text-lg font-medium ri-home-5-line"></i>
        </Link>
      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif"
          alt=""
        />
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-10"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium">Sammy</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">MH01AB3343</h4>
            <p className="text-sm text-gray-600">Maruti Suzuki WagonR</p>
          </div>
        </div>

        <div className="flex gap-2 justify-between flex-col items-center">
          <div className="w-full mt-5">
            

            <div className="flex items-center gap-5 p-3 border-b border-black/30">
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className="text-lg font-medium">562/11-A,</h3>
                <p className="text-sm -mt-1 text-gray-600">
                  ABC street, ABC, USA
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 p-3 ">
              <i className="ri-cash-line"></i>
              <div>
                <h3 className="text-lg font-medium">₹193.20</h3>
                <p className="text-sm -mt-1 text-gray-600">
                  ABC street, ABC, USA
                </p>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full mt-5 bg-green-500 text-white font-semibold p-2 rounded-lg">Make a Payment</button>
      </div>
    </div>
  );
};

export default Riding;
