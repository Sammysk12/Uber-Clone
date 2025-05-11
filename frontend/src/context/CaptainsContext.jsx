import { useState } from "react";
import { useContext } from "react";
import { createContext} from "react";

export const CaptainsDataContext = createContext();



const CaptainsContextProvider = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    }

    const value = {
        captain,
        setCaptain,
        loading,
        setIsLoading,
        error,
        setError,
        updateCaptain
    }

    return (
        <CaptainsDataContext.Provider value={value}>
            {children}
        </CaptainsDataContext.Provider>
    );
};

export default CaptainsContextProvider;