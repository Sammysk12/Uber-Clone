import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CaptainHome = () => {


  const [isRidePopUpPanelOpen, setIsRidePopUpPanelOpen] = useState(true);



  const ridePopupPanelRef = useRef(null);


   useGSAP(
    function () {
      if (isRidePopUpPanelOpen) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0%)",
          duration: 0.5,
        });
        
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100%)",
          duration: 0.5,
        });
      }
    },
    [isRidePopUpPanelOpen]
  );



  return (
    <div className="h-screen">
      <div className="fixed p-3 top-0 items-center justify-between flex w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
          alt=""
        />

        <Link
          to="/captain-login"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full "
        >
          <i class="ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif"
          alt=""
        />
      </div>

      {/* Captain details like how much time ride done, cataiobnn details earnings, etc */}
      <div className="h-2/5 p-4">
        <CaptainDetails />
      </div>

      <div ref={ridePopupPanelRef} className="fixed w-full z-10 bottom-0 bg-white py-8 px-3 pt-12 ">
        <RidePopUp setIsRidePopUpPanelOpen={setIsRidePopUpPanelOpen} />
      </div>
    </div>
  );
};

export default CaptainHome;
