
import { signup } from "../store/user/user.actions";
import { useState } from "react";
import { useNavigate } from "react-router";

export function SignUp() {
    const [user, setUser] = useState({});

    const navigate = useNavigate()


    function handleChange(event) {
        const { name, value } = event.target; // Destructure name and value from the input
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value, // Update the specific field in the state
        }));
    }

    async function handleSubmit(user) {
        await signup(user)
        navigate('/profile')
    }

    return (
        <div className="container">
            <h2>Sign Up 😊</h2>
            <form className="sign-up-form" >
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
                <div className="btn-box">
                    <button onClick={() => handleSubmit(user)} type="button">Sign Up</button>
                    <button onClick={() => navigate('/login')} type="button">Login Instead</button>
                </div>
            </form>
        </div >
    );
}
