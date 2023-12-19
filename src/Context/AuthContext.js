import { createContext, useState } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({children})=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <AuthContext.Provider value = {{isLoggedIn, setIsLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
};

export {AuthContext, AuthProvider};