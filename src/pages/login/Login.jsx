import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useUrlContext } from "../../context/UrlContext";
import "./login.css";

function Login() {
    const navigate = useNavigate();
    const { user, setUser, axios_base_url, setAuthorized, checkAuth } = useAuthContext();
    const { setTitle } = useUrlContext();
    const [loginFailed, setLoginFailed] = useState(false);

    useEffect(() => {
        checkAuth();
        setTitle("Login");
    }, [])

    const changeHandler = (evt) => {
        setUser(prev => ({
            ...prev,
            [evt.target.name]: evt.target.value
        }));
    };

    const submitHandler = async (evt) => {
        evt.preventDefault();
        try {
            const response = await axios_base_url.post("/auth/login", user);
            setAuthorized(response.data.auth);
            navigate("/dashboard");
            setUser({
                email: "",
                password: ""
            });
        } catch (error) {
            console.error(error);
            setLoginFailed(true);
        }
    }

    return (
        <div className="container_login">
            <section className="login_form">
                <form action="submit" onSubmit={submitHandler}>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" required value={user.email} onChange={changeHandler} />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required value={user.password} onChange={changeHandler} />
                    {loginFailed ? <p>Incorrect username or password</p> : <></>}
                    <button>Login</button>
                </form>
            </section>
        </div>
    );
};

export default Login;