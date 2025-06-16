import React, { createContext, useEffect } from 'react'
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AppContext = createContext();

function AppProvider({ children }) {
    const [user,setUser] = useState(3);
    const [searchKeys, setSearchKeys] = useState("");
    const navigate = useNavigate();

    return (
        <AppContext.Provider value={{ setSearchKeys, searchKeys,user }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider

export const useAppContext = () => useContext(AppContext);