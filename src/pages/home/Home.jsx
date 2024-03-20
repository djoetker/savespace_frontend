import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useUrlContext } from "../../context/UrlContext";
import Typewriter from "./Typewriter";
import "./Home.css"

function Home() {
    const { setTitle } = useUrlContext();
    const { checkAuth } = useAuthContext();
    useEffect(() => {
        setTitle("Home");
        checkAuth();
    }, []);

    return (
        <div className="container_home">
            <section className="subcontainer_text">
                <h2>Register now</h2>
                <h2>shorten your URL</h2>
                <h2>and start saving space</h2>
                <p>with <span className="italic">save space</span> the user will always see a preview of the destination website before redirecting. creating a direct and safe environment within the web. no unwanted surprises and misleadings.</p>
            </section>
            <Typewriter />

        </div>
    );
};

export default Home;