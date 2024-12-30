
import { useState } from "react"
import { useSelector } from "react-redux"
import { saveToy } from "../store/toys/toys.actions"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { utilService } from "../services/util.service"

export function ChatForm({ toy }) {


    const [msg, setMsg] = useState('')
    const toys = useSelector(state => state.toyModule.toys)

    const user = useSelector(state => state.userModule.user)


    async function handleSubmit(e) {
        e.preventDefault()
        const comment = { id: utilService.makeId(), txt: msg, by: { id: user.id, name: user.name } }
        const toyToSave = {
            ...toy,
            msgs: toy.msgs ? [...toy.msgs, comment] : [comment]
        };
        try {
            saveToy(toyToSave)
            showSuccessMsg('saved comment!')
        }
        catch (error) {
            console.log(error)
            showErrorMsg('failed to save comment')
        }
    }

    return (
        <div className="container">
            <h2>{msg}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">comment: </label>
                    <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)} />
                </div>
                <button type="submit">submit comment</button>
            </form>
        </div>
    )
}