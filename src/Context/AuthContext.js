import { createContext, useState } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({children})=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    return (
        <AuthContext.Provider value = {{isLoggedIn, setIsLoggedIn, userDetails, setUserDetails}}>
            {children}
        </AuthContext.Provider>
    )
};

export {AuthContext, AuthProvider};