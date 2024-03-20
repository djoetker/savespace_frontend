import "./Navbar.css"
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useUrlContext } from "../../context/UrlContext";
import { useEffect } from "react";

function Navbar() {
    const { authorized, setAuthorized, axios_base_url, setIsLoading } = useAuthContext();
    const { title } = useUrlContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authorized) navigate("/");
    }, [authorized]);

    const logoutUser = async () => {
        try {
            const response = await axios_base_url.post("/auth/logout");
            setIsLoading(true);
            setAuthorized(response.data.auth);
        } catch (error) {
            console.error("error during logout:" + error);
        };
    };

    const navbarContent = authorized ? <div className="container_navbar">
        <Link to="">home</Link>
        <Link onClick={logoutUser}>Logout</Link>
        <Link to="dashboard">dashboard</Link>
        <Link className="button_create" to="create">create</Link>
    </div> : <div className="container_navbar">
        <Link to="">home</Link>
        <Link to="about">about</Link>
        <Link to="login">log in</Link>
        <Link to="register">register</Link>
    </div>


    return (
        <div className="container_header">
            <div className="container_logo">
                <div className="square">
                    <h1>SAVE</h1>
                    <h1>SPACE</h1>
                </div>
                <div className="subcontaier_title">
                    <h2 className="site_title">{title}</h2>
                </div>
            </div>
            {navbarContent}
        </div>
    );
};

export default Navbar;