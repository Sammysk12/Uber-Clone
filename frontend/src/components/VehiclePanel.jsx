import React from "react";

const VehiclePanel = (props) => {
  const availableVehicles = [
    {
      url: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png",
      vehicleType: "UberXL",
      capacity: 4,
      time: "2 mins away",
      price: "₹193.20",
      description: "Affordable, Compact rides",
    },
    {
      url: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
      vehicleType: "Moto",
      capacity: 1,
      time: "3 mins away",
      price: "₹65.40",
      description: "Affordable, Motorcycle rides",
    },
    {
      url: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
      vehicleType: "Uber Auto",
      capacity: 3,
      time: "2 mins away",
      price: "₹118.80",
      description: "Affordable, Auto rides",
    },
  ];

  return (
    <div>
      <h5
        className="p-3 right-0 text-2xl absolute top-0"
        onClick={() => props.setIsVehiclePanelOpen(false)}
      >
        <i className="ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Select a ride</h3>
      {availableVehicles.map((vehicle, index) => (
        <div key={index} onClick={()=>props.setIsRideConfirmedPanelOpen(true)} className="flex border-2 active:bg-gray-200 active:transition border-black mb-2 rounded-2xl w-full p-3 justify-between items-center">
          <img className="h-12 mr-2" src={vehicle.url} alt="" />
          <div className="ml-2 w-1/2">
            <h4 className="text-base font-medium">
              {vehicle.vehicleType}{" "}
              <span className="ml-2">
                <i className="ri-user-3-fill"></i>
                {vehicle.capacity}
              </span>
            </h4>
            <h5 className="text-sm font-medium mb-0.5">{vehicle.time}</h5>
            <p className="text-xs font-normal text-gray-600">
              {vehicle.description}
            </p>
          </div>
          <h2 className="text-lg font-semibold">₹193.20</h2>
        </div>
      ))}
    </div>
  );
};

export default VehiclePanel;
