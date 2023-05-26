import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';


const Contextpage = createContext();

export function ContextProvider({ children }) {

    const navigate = useNavigate();

    const [data, setData] = useState(0);

    return (

        <Contextpage.Provider value={{
            data,
            setData,
        }}>
            {children}
        </Contextpage.Provider>
    )
}

export default Contextpage