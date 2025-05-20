import React from 'react'

const LocationSearchPanel = (props) => {

   
        // sample array for locations
        const locations = [
                {
                        id: 1,
                        name: "1600 Amphitheatre Parkway, Mountain View, CA, USA"
                },
                {
                        id: 2,
                        name: "221B Baker Street, London, UK"
                },
                {
                        id: 3,
                        name: "508, Vyankateshwara 7 hills, Vasant Vihar, Solapur, India"
                },
                {
                        id: 4,
                        name: "1 Infinite Loop, Cupertino, CA, USA"
                }
        ]


return (
    <div>
            {/* This is the location search panel example */}

            {locations.map((location, index) => (
                <div key={index} onClick={()=> {props.setIsVehiclePanelOpen(true); props.setIsPanelOpen(false)}} className='flex items-center active:bg-gray-200 p-3 my-6 rounded-xl justify-start gap-4'>
                    <h2 className='bg-[#eee] h-10 w-12 flex items-center justify-center rounded-full shrink-0'><i className="ri-map-pin-line"></i></h2>
                    <h4 className='font-medium truncate'>{location.name}</h4>
                </div>
            ))}

    </div>
)
}

export default LocationSearchPanel