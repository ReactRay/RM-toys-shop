import { useNavigate } from "react-router"
import { BoardPreview } from "./BoardPreview"



export function BoardList({ boards }) {

    const navigate = useNavigate()

    return (
        <div className="boards-container">
            <div className="board-flex" >
                {boards.map((board) => {
                    return (
                        <div key={board._id} onClick={() => navigate(`/details/${board._id}`)}>
                            <BoardPreview board={board} id={board._id} />
                        </div>
                    )
                })}
            </div>
        </div>
    )

}