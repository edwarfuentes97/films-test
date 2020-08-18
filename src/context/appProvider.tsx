import React from 'react';
import { appContext } from "./appContext";
import { useApi } from "../hooks/useApi";

function AppProvider ({ children }: any) {

    const apiHook = useApi();


    return (
        <appContext.Provider value={{...apiHook }}>
            {children}
        </appContext.Provider>
    );
}

export default AppProvider;
