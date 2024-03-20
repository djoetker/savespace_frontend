import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";

const UrlContext = createContext({});

function UrlContextProvider({ children }) {
    const [urls, setUrls] = useState([]);
    const { authorized, user, setIsLoading, axios_base_url } = useAuthContext();
    const [title, setTitle] = useState("Home");
    const getAllUrls = async () => {
        const response = await axios_base_url.get(("/url/user/all"));
        setUrls(response.data);
        setIsLoading(false);
    };

    useEffect(() => {
        if (authorized) {
            getAllUrls();
        }
    }, []);

    return (
        <UrlContext.Provider value={{ urls, setUrls, getAllUrls, title, setTitle }}>
            {children}
        </UrlContext.Provider>
    );
};

export default UrlContextProvider;

export const useUrlContext = () => {
    const urlContext = useContext(UrlContext);
    return urlContext;
};