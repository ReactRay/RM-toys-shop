import { useNavigate } from "react-router"
import { MultiSelect } from "../cmps/MultiSelect"
import { useState } from "react"
import { saveToy } from "../store/toys/toys.actions"
import { ImgUploader } from "../cmps/ImgUploader"
import { showSuccessMsg } from "../services/event-bus.service"
import { useSelector } from "react-redux"

const arr = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']

export function AddToy() {
    const [toy, setToy] = useState({})
    const [options, SetOptions] = useState(arr || [])
    const [selected, SetSelected] = useState([])
    const userStyle = useSelector(state => state.userModule.user.prefs)



    const navigate = useNavigate()

    function handleAdd(val) {
        SetSelected((prev) => [...prev, val])
        SetOptions((prev) => prev.filter(x => x !== val))

    }

    function handleDelete(val) {
        SetOptions(prev => [...prev, val])
        SetSelected(prev => prev.filter(x => x !== val))
    }


    function handleChange(event) {
        const { name, value } = event.target;
        setToy((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));

    }

    function onUploaded(imgUrl) {
        setToy(prevCredentials => ({ ...prevCredentials, imgUrl }))
        showSuccessMsg('image uploaded 😊!')
    }


    async function handleAddToy(e) {
        e.preventDefault()
        let toyToAdd = { name: toy.toyName, price: toy.price, labels: selected, imgUrl: toy.imgUrl }

        console.log(toyToAdd)

        await saveToy(toyToAdd)

        navigate('/toys')

        showSuccessMsg('toy added ! ')

    }
    return (
        <div className="container">


            <form className="form-add box-shadow" style={userStyle}>
                <h2>lets add a toy</h2>
                <div>
                    <label >toy name:</label>
                    <input type="text"
                        name="toyName"
                        onChange={handleChange}
                        required />
                </div>
                <div>
                    <label >price:</label>
                    <input type="number" name='price' onChange={handleChange} required />
                </div>
                <MultiSelect handleAdd={handleAdd} handleDelete={handleDelete} options={options} selected={selected} />
                <ImgUploader onUploaded={onUploaded} />


                <button type="submit" onClick={handleAddToy}>add toy</button>
                <button onClick={() => navigate('/toys')}>cancel</button>
            </form>
        </div>
    )
}