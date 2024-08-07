import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState(null);
    const [userToken, setUserToken] = useState(null);

    return (
        <UserContext.Provider value={{ userEmail, setUserEmail, userToken, setUserToken }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
