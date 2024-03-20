import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useUrlContext } from "../../context/UrlContext";
import "./RedirectSite.css";

function RedirectSite() {
    const { urlId } = useParams();
    const [url, setUrl] = useState({});
    const [favicon, setFavicon] = useState("");
    const { axios_base_url } = useAuthContext();
    const getUrlData = async () => {
        try {
            const response = await axios_base_url.get(`/url/get/${urlId}`);
            setUrl(response.data);
            setFavicon("https://s2.googleusercontent.com/s2/favicons?domain=" + response.data.url)
        } catch (error) {
            console.error(error);
        };
    };
    useEffect(() => {

        getUrlData();
    }, []);


    return (
        <>
            <div className="container_navbar_redirect">
                <h4>save space</h4>
                <Link to="/">create your own</Link>
            </div>
            <hr />
            <div className="container_redirect">
                <div className="container_urlview_redirect">
                    <section className="subcontainer_favicon_redirect">
                        <img src={favicon} alt="" />
                    </section>
                    <section className="subcontainer_urlview_redirect">
                        <h3>{url.title}</h3>
                        <p id="url">{url.url}</p>
                    </section>
                    <section className="subcontainer_redirect_button">
                        <Link to={url.url}>redirect</Link>
                    </section>
                </div>
            </div>

        </>
    );
};

export default RedirectSite;