import { use, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const [isVehiclePanelOpen, setIsVehiclePanelOpen] = useState(false);

  const [isRideConfirmedPanelOpen, setIsRideConfirmedPanelOpen] =
    useState(false);

  const [isLookingForDriverPanelOpen, setIsLookingForDriverPanelOpen] =
    useState(false);

  const [isWaitingForDriverPanelOpen, setIsWaitingForDriverPanelOpen] =
    useState(false);

  const submithandler = (e) => {
    e.preventDefault();

    if (!pickup || !destination) {
      alert("Please fill in all fields");
      return;
    }

    console.log(pickup, destination);
    // navigate("/search", { state: { pickup, destination } });
  };

  const panelRef = useRef(null);
  const panelRefClose = useRef(null);
  const vehiclePanelRef = useRef(null);
  const rideConfirmedRef = useRef(null);
  const lookingForDriverRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  //Gsap for vehicle panel
  // useGSAP is a custom hook that uses gsap to animate the vehicle panel
  useGSAP(
    function () {
      if (isVehiclePanelOpen) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0%)",
          duration: 0.5,
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
          duration: 0.5,
        });
      }
    },
    [isVehiclePanelOpen]
  );

  //Gsap for ride confirmed panel
  // useGSAP is a custom hook that uses gsap to animate the ride confirmed panel
  useGSAP(
    function () {
      if (isRideConfirmedPanelOpen) {
        gsap.to(rideConfirmedRef.current, {
          transform: "translateY(0%)",
          duration: 0.5,
        });
      } else {
        gsap.to(rideConfirmedRef.current, {
          transform: "translateY(100%)",
          duration: 0.5,
        });
      }
    },
    [isRideConfirmedPanelOpen]
  );

  //Gsap for location search panel
  // useGSAP is a custom hook that uses gsap to animate the location search panel
  useGSAP(
    function () {
      if (isPanelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: "24",
        });
        gsap.to(panelRefClose.current, {
          opacity: 1,
          duration: 0.5,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
        });
        gsap.to(panelRefClose.current, {
          opacity: 0,
          duration: 0.5,
        });
      }
    },
    [isPanelOpen]
  );

  //Gsap for looking for driver panel
  // useGSAP is a custom hook that uses gsap to animate the looking for driver panel
  useGSAP(
    function () {
      if (isLookingForDriverPanelOpen) {
        gsap.to(lookingForDriverRef.current, {
          transform: "translateY(0%)",
         
        });
        
      } else {
        gsap.to(lookingForDriverRef.current, {
          transform: "translateY(100%)",
        });
       
      }
    },
    [isLookingForDriverPanelOpen]
  );

  //Gsap for looking for driver panel
  // useGSAP is a custom hook that uses gsap to animate the looking for driver panel
  useGSAP(
    function () {
      if (isWaitingForDriverPanelOpen) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0%)",
         
        });
        
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
       
      }
    },
    [isWaitingForDriverPanelOpen]
  );

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
        alt=""
      />

      <div
        onClick={() => setIsVehiclePanelOpen(false)}
        className="h-screen w-screen "
      >
        {/* img for temporary */}
        <img
          className="w-full h-full object-fill"
          src="https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif"
          alt=""
        />
      </div>

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={panelRefClose}
            onClick={() => setIsPanelOpen(false)}
            className="absolute top-3 right-3 text-xl"
          >
            <i className="ri-arrow-down-wide-fill"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onSubmit={(e) => submithandler(e)}>
            <div className="line absolute h-16 w-1 top-[45%] bg-gray-900 left-10 rounded-full"></div>
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pick up location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              onClick={() => setIsPanelOpen(true)}
            />
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter a destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onClick={() => setIsPanelOpen(true)}
            />
          </form>
        </div>
        <div ref={panelRef} className=" bg-white ">
          <LocationSearchPanel
            isPanelOpen={isPanelOpen}
            setIsPanelOpen={setIsPanelOpen}
            isVehiclePanelOpen={isVehiclePanelOpen}
            setIsVehiclePanelOpen={setIsVehiclePanelOpen}
          />
        </div>

        <div
          ref={vehiclePanelRef}
          className="fixed w-full z-10 bottom-0 bg-white py-8 px-3 pt-12 translate-y-full"
        >
          <VehiclePanel
            setIsRideConfirmedPanelOpen={setIsRideConfirmedPanelOpen}
            isVehiclePanelOpen={isVehiclePanelOpen}
            setIsVehiclePanelOpen={setIsVehiclePanelOpen}
            vehiclePanelRef={vehiclePanelRef}
          />
        </div>
        <div
          ref={rideConfirmedRef}
          className="fixed w-full z-10 bottom-0 bg-white py-6 px-3 pt-12 translate-y-full"
        >
          <ConfirmedRide setIsRideConfirmedPanelOpen={setIsRideConfirmedPanelOpen} setIsLookingForDriverPanelOpen={setIsLookingForDriverPanelOpen} />
        </div>
        <div ref={lookingForDriverRef} className="fixed w-full z-10 bottom-0 bg-white py-6 px-3 pt-12 translate-y-full">
          <LookingForDriver setIsLookingForDriverPanelOpen={setIsLookingForDriverPanelOpen} />
        </div>
        <div ref={waitingForDriverRef} className="fixed w-full z-10 bottom-0 bg-white py-6 px-3 pt-12 ">
          <WaitingForDriver setIsWaitingForDriverPanelOpen={setIsWaitingForDriverPanelOpen} />
        </div>

      </div>
    </div>
  );
};

export default Home;
