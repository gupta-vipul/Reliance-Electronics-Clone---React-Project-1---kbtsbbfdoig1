import { createContext, useState } from "react";

const SearchContext = createContext(null);

const SearchProvider = ({children})=>{
    const [searchInputText, setSearchInputText] = useState("");

    return (
        <SearchContext.Provider value={{searchInputText, setSearchInputText}}>
            {children}
        </SearchContext.Provider>
    )
};

export {SearchContext, SearchProvider};