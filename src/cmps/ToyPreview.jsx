
import { Navigate, useNavigate } from "react-router"
import { removeToy } from "../store/toys/toys.actions"
import { useSelector } from "react-redux"

export function ToyPreview({ toy }) {

    const navigate = useNavigate()
    const user = useSelector(s => s.userModule.user)
    async function handleDelete(id) {
        await removeToy(id)
    }

    return (
        <div className="toy-preview">
            {toy && <> <h3>toy name:{toy.name}</h3>

                <h3>price:{toy.price}$</h3>
                <img src={toy.imgUrl} width='200px' height='200px' alt="toy" />
                <div className="labels">
                    {toy?.labels?.map((toy, idx) => {
                        return <li key={idx + toy}>
                            {toy}
                        </li>
                    })}
                </div>
                <div className="btn-box" >
                    {user.isAdmin && <button onClick={() => navigate(`/edit/${toy.id}`)}>edit</button>}
                    <button onClick={() => navigate(`/details/${toy.id}`)}>details</button>
                    {user.isAdmin && <button onClick={() => handleDelete(toy.id)}>delete</button>}
                </div></>}
        </div>
    )
}