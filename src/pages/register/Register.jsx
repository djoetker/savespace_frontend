import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useUrlContext } from "../../context/UrlContext";
import "./Register.css"

const initialStateUser = {
    email: "",
    password: "",
    passwordCheck: ""
};

function Register() {
    const navigate = useNavigate();
    const { axios_base_url, setAuthorized, checkAuth } = useAuthContext();
    const { setTitle } = useUrlContext();
    const [userData, setUserData] = useState(initialStateUser);

    useEffect(() => {
        setTitle("Register");
        checkAuth();
    }, []);

    const onChangeHandler = (evt) => {
        setUserData(prev => ({
            ...prev,
            [evt.target.name]: evt.target.value
        }));
    };

    const submitHandler = async (evt) => {
        evt.preventDefault();
        const response = await axios_base_url.post("/auth/register", userData);
        setAuthorized(response.data.auth);
        navigate("/dashboard");
    };


    return (
        <div className="container_register">
            <section className="login_form">
                <form action="submit" onSubmit={submitHandler}>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" required value={userData.name} onChange={onChangeHandler} />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required value={userData.password} onChange={onChangeHandler} />
                    <label htmlFor="passwordCheck">Password</label>
                    <input type="password" name="passwordCheck" id="passwordCheck" required value={userData.passwordCheck} onChange={onChangeHandler} />
                    <button disabled={userData.password.length == 0 || userData.password !== userData.passwordCheck}>Register</button>
                </form>
            </section>
        </div>
    );
};

export default Register;