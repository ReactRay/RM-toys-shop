import { useNavigate } from "react-router"
import { login } from "../store/user/user.actions";
import { useState } from "react";
import { useSelector } from "react-redux";


export function Login() {

    const [user, setUser] = useState({})
    const navigate = useNavigate()

    const myUser = useSelector(state => state.userModule.user || { name: 'no user' })

    function handleChange(event) {
        const { name, value } = event.target; // Destructure name and value from the input
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value, // Update the specific field in the state
        }));
    }

    async function handleSubmit(user) {
        await login(user)
        console.log('logged in as ', myUser)
        navigate('/profile')

    }
    return (
        <div className="container">
            <h1>Login here 🥳</h1>
            <form onSubmit={() => handleSubmit(user)} className="sign-up-form">
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
                <button type="submit">submit</button>
                <button onClick={() => navigate('/')}>sign up instead</button>
            </form>
        </div>
    )
}