import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toyService } from "../services/toys.service";
import { Link } from "react-router-dom";
import { ChatForm } from "../cmps/ChatForm";
import { ChatDisplay } from "../cmps/ChatDisplay";

export function Details() {
    const { toyId } = useParams();
    const [toy, setToy] = useState({})

    useEffect(() => {
        onLoadToy(toyId)
    }, [toyId, toy])


    async function onLoadToy(id) {
        try {
            const toy = await toyService.getById(id);
            setToy(toy || {}); // Fallback for non-existent toy
        } catch (error) {
            console.error('Error loading toy:', error);
        }
    }

    return <div className="container">
        <div>
            <h2>toy: {toy.name}</h2>
            <h2>price: {toy.price}$</h2>
            <img src={toy.imgUrl} width='200px' height='200px' />
            <ul>
                {toy.labels?.map((label, idx) => {
                    return (
                        <li key={label + idx}>
                            {label}
                        </li>
                    )
                })}
            </ul>
            <div style={{ marginTop: '1rem' }}>
                <Link to={'/toys'}>back</Link>
            </div>
            <div>
                <ChatForm toy={toy} />
                <ChatDisplay toy={toy} />
            </div>


        </div>

    </div>
}