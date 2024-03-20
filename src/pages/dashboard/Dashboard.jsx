import "./Dashboard.css"
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import EditUrl from "./EditUrl";
import { useUrlContext } from "../../context/UrlContext";


function Dashboard() {
    const { isLoading, checkAuth } = useAuthContext();
    const { urls, getAllUrls, setTitle } = useUrlContext();
    const [showModal, setShowModal] = useState(false);
    const [copied, setCopied] = useState(false);
    const [urlID, setUrlID] = useState("");
    const { axios_base_url } = useAuthContext();
    
    
    if (isLoading) {
        return (
            <div className="container_dashboard">
                <h1>dashboard</h1>
                <section>
                    <p>loading...</p>
                </section>
            </div>
        )
    };
    
    useEffect(() => {
        setTitle("Dashboard");
        checkAuth();
    }, []);
    
    useEffect(() => {
        const getUrls = async () => {
            await getAllUrls();
        };
        getUrls();
    }, [])
    
    const toggleModal = (evt) => {
        if (evt.target.id) {
            const id = evt.target.id;
            setUrlID(id);
        }
        setShowModal(!showModal);
    };
    
    const deleteUrl = async (evt) => {
        const id = urlID;
        setShowModal(!showModal)
        await axios_base_url.delete(`/url/delete/${id}`);
        await getAllUrls();
    };

    return (
        <div className="container_dashboard">
            <section>
                {urls.map(url => {
                    const favicon = "https://s2.googleusercontent.com/s2/favicons?domain=" + url.url;
                    return (
                        <div key={url._id} className="container_url_view">
                            <section className="subcontainer_favicon">
                                <img src={favicon} alt="favicon of destination url" />
                            </section>
                            <section className="subcontainer_url_info">
                                <h3>{url.title}</h3>
                                <p id="slug">{import.meta.env.VITE_API_BASE_URL + "/" + url.slug}</p>
                                <p id="url">{url.url}</p>
                            </section>
                            <section className="subcontainer_edit">
                                <EditUrl urlId={url._id} copyText={import.meta.env.VITE_API_BASE_URL + "/" + url.slug} toggleModal={toggleModal} setUrlID={setUrlID} setCopied={setCopied} copied={copied}/>
                            </section>
                        </div>
                    )
                })}
            </section>
            {showModal && (
                <div className="overlay" onClick={toggleModal}>
                    <div className="modal_delete">
                     <div className="modal_delete_content"> 
                        <p>Are you sure to delete URL?</p>
                        <section className="button_section">
                        <button onClick={deleteUrl}>Yes</button>
                        <button onClick={toggleModal}>No</button>
                        </section>
                      </div>
                     </div> 
                </div>
            )}
        {copied && <div className="copy_feedback">Copied!</div>}

        </div>
    );
};

export default Dashboard;
