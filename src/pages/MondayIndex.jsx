
import { useSelector } from "react-redux";
import BoardDetails from "./BoardDetails";
import { logout } from "../store/user/user.actions";
import { useNavigate } from "react-router";

export function MondayIndex() {

    const navigate = useNavigate()
    const user = useSelector(state => state.userModule.user)

    function onLogout() {
        navigate('/')
        logout()

    }

    return (
        <div className="index-container">
            <div className="profile">
                <div>
                    <h2>You Logged In  {user?.fullName || 'no user'}!</h2>
                </div>

                <img src={user?.imgUrl} width={'300px'} alt="" />
                <button className="btn" onClick={onLogout}>Log out</button>
            </div>

            <div>
                <BoardDetails />
            </div>
        </div>
    )
}