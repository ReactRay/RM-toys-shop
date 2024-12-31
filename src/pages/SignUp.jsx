
import { signup } from "../store/user/user.actions";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { showErrorMsg } from "../services/event-bus.service";
import { ImgUploader } from "../cmps/ImgUploader";
import { useSelector } from "react-redux";

export function SignUp() {
    const [user, setUser] = useState({});

    const navigate = useNavigate()

    const myUser = useSelector(state => state.userModule.user || null)




    function handleChange(event) {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    }
    function validateFields() {
        const newErrors = {};
        if (!user.username) newErrors.username = "Username is required.";
        if (!user.password) newErrors.password = "Password is required.";
        if (!user.name) newErrors.name = "Name is required.";
        return Object.keys(newErrors).length === 0; // Return true if no errors
    }

    async function handleSubmit() {
        if (!validateFields()) {
            showErrorMsg('something went wrong')
            return;
        }
        await signup(user);
        navigate("/toys");
    }

    function onUploaded(imgUrl) {
        setUser(prevCredentials => ({ ...prevCredentials, imgUrl }))
    }

    return (
        <div className="container">
            <h2>Sign Up 😊  or use admin account ,user:admin pass:123</h2>
            <form className="sign-up-form " >
                <div className="form-section">
                    <label htmlFor="username">UserName: </label>
                    <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-section">
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-section">
                    <label htmlFor="name">Your Name: </label>
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                    />
                </div>
                <ImgUploader onUploaded={onUploaded} />

                <div className="btn-box">
                    <button onClick={() => handleSubmit(user)} type="button">Sign Up</button>
                    <button className="danger" onClick={() => navigate('/login')} type="button">Login Instead</button>
                </div>
            </form>
        </div >
    );
}
