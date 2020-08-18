import React from 'react';
import AppProvider from "./appProvider";

export function WithContext(WrappedComponent: any) {
    function appContainer(props: any) {
        return(
            <AppProvider>
                <WrappedComponent {...props}/>
            </AppProvider>
        );
    }

    return appContainer
}
