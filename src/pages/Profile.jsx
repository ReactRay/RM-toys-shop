
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
            navigate('/login')
            setTimeout(() => {
                logout()
                showSuccessMsg('logged out')
            }, 1000)


        } catch (err) {
            showErrorMsg('Cannot logout', err)
        }
    }

    return (
        <div >
            <div className="profile-container box-shadow">
                <div> <h1>Home </h1>
                    <h1>welcome {user?.name}</h1>
                    <button onClick={onLogout}>Log out</button>

                    {user.isAdmin ? <button onClick={() => navigate('/add')}>add toy</button> : ''}

                </div>

                <img src={user?.imgUrl} />
            </div>


        </div>
    )
}