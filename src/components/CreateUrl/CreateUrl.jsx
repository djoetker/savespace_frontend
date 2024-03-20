import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useUrlContext } from "../../context/UrlContext";
import "./CreateUrl.css";

const initialUrlState = {
    url: ""
}

function CreateUrl() {
    const navigate = useNavigate();
    const [newUrl, setNewUrl] = useState(initialUrlState);
    const { axios_base_url, checkAuth } = useAuthContext();
    const { getAllUrls, setTitle } = useUrlContext();

    useEffect(() => {
        setTitle("Create");
        checkAuth();
    }, []);

    const changeHandler = (evt) => {
        setNewUrl(prev => ({
            ...prev,
            [evt.target.name]: evt.target.value
        }));
    };

    const submitHandler = async (evt) => {
        evt.preventDefault();
        try {
            await axios_base_url.post("/url/new", newUrl);
            await getAllUrls();
            setNewUrl(initialUrlState);
            navigate("/dashboard");
        } catch (error) {
            console.error("error creating new slug: " + error)
        };
    };


    return (
        <section className="container_create">
            <form action="submit" onSubmit={submitHandler}>
                <label htmlFor="url">Destination</label>
                <input type="text" name="url" id="url" required onChange={changeHandler} value={newUrl.url} />

                <section className="container_button">
                    <button>Create</button>
                </section>
            </form>
        </section>
    );
};

export default CreateUrl;