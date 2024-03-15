import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './css/register.css'; // Assuming you have a register.css file for styling

export default function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const [registerError, setRegisterError] = useState('');

    const handleForm = async (event) => {
            event.preventDefault();
            if(password === password1)
            {
                try {
                    const res = await axios.post("http://localhost:3001/register", {
                        username: email,
                        password: password
                    });
                    navigate('/login');
                } catch (error) {
                    setRegisterError("Registration failed. Please try again.");
                }
            }
            else
            {
                setRegisterError("Check your Password");
            }
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setRegisterError("");
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setRegisterError("");
    }
    const handlePasswordChange1 = (event) => {
        setPassword1(event.target.value);
        setRegisterError("");
    }

    const handleLoginClick = () => {
        navigate('/login');
    }

    return (
        <section>
            <div className="form-box">
                <div className="form-value">
                    <form onSubmit={handleForm}>
                        <h2>Register</h2>
                        <div className="inputbox">
                            <ion-icon name="mail-outline"></ion-icon>
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                            <label>Email</label>
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
                        <div className="inputbox">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            <input
                                type="password"
                                value={password1}
                                onChange={handlePasswordChange1}
                                required
                            />
                            <label>Confirm Password</label>
                        </div>
                        {registerError && <p className="error">{registerError}</p>}
                        <button type="submit">Register</button>
                        <div className="register">
                            <p>Already have an account? <a href="#" onClick={handleLoginClick}>Log In</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
