
import { useSelector } from "react-redux";
import { logout } from "../store/user/user.actions";
import { useNavigate } from "react-router";
import { BoardList } from "../cmps/BoardList";
import { useEffect } from "react";
import { loadBoards } from "../store/boards/boards.actions";

export function MondayIndex() {




    const navigate = useNavigate()
    const user = useSelector(state => state.userModule.user)
    const boards = useSelector(state => state.boardModule.boards)
    useEffect(() => {
        onLoadBoards()

    }, [])


    async function onLoadBoards() {
        await loadBoards()

    }

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
            <BoardList boards={boards} />

        </div>
    )
}