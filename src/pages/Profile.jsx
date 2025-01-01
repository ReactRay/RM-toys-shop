
import { useSelector } from "react-redux"
import { logout } from "../store/user/user.actions"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import { addRandomToy, loadToys } from "../store/toys/toys.actions"
import { Presets } from "../cmps/Presets"




export function Profile({ userStyle }) {

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

    async function handleAddRandomToy() {
        try {
            await addRandomToy()
            await loadToys()
            showSuccessMsg('Random toy added')
        } catch (err) {
            showErrorMsg('Error adding random toy', err)
        }
    }


    return (
        <div >
            <div className="profile-container box-shadow" style={userStyle}>
                <div>
                    <h1>welcome {user?.name}</h1>
                    <button className="danger" onClick={onLogout}>Log out</button>

                    {user.isAdmin ? <button onClick={() => navigate('/add')}>add toy</button> : ''}
                    {user.isAdmin ? <button onClick={() => handleAddRandomToy()}>add random toy</button> : ''}

                </div>

                <img src={user?.imgUrl} />
                <Presets />

            </div>
            <div>
            </div>


        </div>
    )
}