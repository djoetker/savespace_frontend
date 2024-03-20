import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";


function PrivateRoute() {
    const { authorized, isLoading } = useAuthContext();

    if (isLoading) {
        return (
            <h2>loading...</h2>
        );
    };

    return (
        authorized ? <Outlet /> : <Navigate to="/" />
    );
};

export default PrivateRoute;