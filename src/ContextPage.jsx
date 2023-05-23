import { createContext, useState } from "react";

const Contextpage = createContext();

export function ContextProvider({ children }) { 

    const [data, setData] = useState(0);

    return (

        <Contextpage.Provider value={{
            data,
            setData
        }}>
            {children}
        </Contextpage.Provider>
    )
}

export default Contextpage