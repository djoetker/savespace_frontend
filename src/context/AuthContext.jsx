import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext({});
const initialUser = {
    email: "",
    password: ""
};

function AuthContextProvider({ children }) {

    const [user, setUser] = useState(initialUser);
    const [isLoading, setIsLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    const axios_base_url = axios.create({
        baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
        withCredentials: true
    });


    //Check for token in local storage and sned it via auth route to backend

    const checkAuth = async () => {
        axios_base_url.get("/auth/getauth")
            .then((response) => {
                setUser(response.data.user);
                setAuthorized(response.data.auth);
                setIsLoading(false);
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {

                    setAuthorized(false);
                } else {
                    console.error("An error occurred while checking authentication:", error);
                }
                setIsLoading(false);
            });
    };

    useEffect(() => {
        const cookies = document.cookie.split(';');
        console.log("cookies: ", cookies);
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, isLoading, setIsLoading, axios_base_url, setAuthorized, authorized, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthContextProvider;

export const useAuthContext = () => {
    const authContext = useContext(AuthContext);
    return authContext;
};