/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { saveToy } from "../store/toys/toys.actions";
export function ChatDisplay({ toy }) {

    const user = useSelector(s => s.userModule.user)

    function handleDelete(id) {
        const newArr = toy.msgs.filter((msg) => msg.id !== id);

        const toyToSave = {
            ...toy,
            msgs: newArr,
        };

        saveToy(toyToSave)
    }

    return (
        <div className="flex-item">
            <ul>
                {toy.msgs && toy.msgs.map((msg) => (
                    <li key={msg.id} >
                        {msg.by.name}: {msg.txt}
                        {user.id === msg.by.id && <button className="delete" onClick={() => { handleDelete(msg.id) }}>X</button>}
                    </li>
                ))}
            </ul>
        </div>
    );
}
