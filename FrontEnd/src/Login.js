import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './css/login.css';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const handleForm = async (event) => {
        try {
            event.preventDefault();
            const res = await axios.post("http://localhost:3001/login", {
                username: email,
                password: password
            });

            if (res.status === 200) {
                localStorage.setItem("jwtToken", res.data.token);
                navigate('/posts');
            }
        } catch (error) {
            setLoginError("Incorrect Credentials");
        }
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setLoginError("");
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setLoginError("");
    }

    const handleRegisterClick = () => {
        navigate('/register');
    }

    return (
        <section>
            <div className="form-box">
                <div className="form-value">
                    <form onSubmit={handleForm}>
                        <h2>Login</h2>
                        <div className="inputbox">
                            <ion-icon name="mail-outline lock-closed-outline"></ion-icon>
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                            <label>UserName</label>
                        </div>
                        <div className="inputbox">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            <input
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                            <label>Password</label>
                        </div>
                        
                        {loginError && <p className="error">{loginError}</p>}
                        <button type="submit">Log In</button>
                        <div className="register">
                            <p>Don't have an account? <a href="#" onClick={handleRegisterClick}>Sign Up</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
