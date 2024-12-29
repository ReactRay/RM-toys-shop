import { useNavigate } from "react-router"
import { login } from "../store/user/user.actions";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";


export function Login() {

    const [user, setUser] = useState({})
    const navigate = useNavigate()

    const myUser = useSelector(state => state.userModule.user || null)

    useEffect(() => {
        if (myUser !== null)
            navigate('/profile')
    }, [myUser])

    function handleChange(event) {
        const { name, value } = event.target; // Destructure name and value from the input
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value, // Update the specific field in the state
        }));
    }
    async function handleSubmit(e) {
        e.preventDefault(); // Prevent the default form submission behavior

        // Validate inputs
        if (!user.username || !user.password) {
            showErrorMsg("Please fill in all fields");
            return;
        }

        try {
            await login(user);
            navigate("/profile");
            showSuccessMsg("Logged in successfully");
        } catch (err) {
            showErrorMsg(err.message || "Invalid credentials");
        }
    }

    return (
        <div className="container">
            <h1>Login here 🥳</h1>
            <form className="sign-up-form" onSubmit={handleSubmit}>
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
                <button type="submit">Submit</button>
                <button type="button" onClick={() => navigate("/")}>
                    Sign up instead
                </button>
            </form>
        </div>
    );
}