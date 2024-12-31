
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
        <div className="toy-preview box-shadow">


            {toy && <> <img src={toy.imgUrl} width='200px' height='200px' alt="toy" />
                <h4>name:{toy.name}</h4>

                <h4>price:{toy.price}$</h4>
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
                    {user.isAdmin && <button className="danger" onClick={() => handleDelete(toy.id)}>delete</button>}
                </div></>}
        </div>
    )
}