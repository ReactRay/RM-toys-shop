
import { useSelector } from "react-redux"
import { logout } from "../store/user/user.actions"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import { Link } from "react-router-dom"

export function Profile() {

    const user = useSelector(state => state.userModule.user) || null

    const navigate = useNavigate()

    useEffect(() => {
        if (!user)
            navigate('/login')
    }, [user, onLogout])

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
            navigate('/login')
        } catch (err) {
            showErrorMsg('Cannot logout', err)
        }
    }

    return (
        <div className="container">
            <div className="profile-container">
                <div> <h1>Home </h1>
                    <h1>welcome {user?.name}</h1>
                    <button onClick={onLogout}>Log out</button>

                </div>

                <img src={user?.imgUrl} />

            </div>
            <Link to={'/toys'} >Toys</Link>

        </div>
    )
}