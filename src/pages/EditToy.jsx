import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toyService } from "../services/toys.service";
import { saveToy } from "../store/toys/toys.actions";
import { showSuccessMsg } from "../services/event-bus.service";
import { MultiSelect } from "../cmps/MultiSelect";
import { useSelector } from "react-redux";


const arr = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']

export function EditToy() {
    const [toyToEdit, setToyToEdit] = useState({ name: '', price: '' });
    const [options, SetOptions] = useState(arr || [])
    const [selected, SetSelected] = useState([])
    const { toyId } = useParams();
    const navigate = useNavigate();

    const userStyle = useSelector(state => state.userModule.user.prefs)



    useEffect(() => {
        if (toyId) {
            loadToy(toyId);
        }
    }, [toyId]);

    useEffect(() => {
        const filteredOptions = arr.filter(option => !selected.includes(option));
        SetOptions(filteredOptions);
    }, [selected]);

    async function loadToy(id) {
        try {
            const toy = await toyService.getById(id);
            setToyToEdit(toy || { name: '', price: '' });
            SetSelected(toy?.labels)

        } catch (error) {
            console.error('Error loading toy:', error);
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setToyToEdit((prevToy) => ({
            ...prevToy,
            [name]: value,
        }));
    }

    function handleAdd(val) {
        const updatedSelected = [...selected, val];
        SetSelected(updatedSelected);
        SetOptions((prev) => prev.filter((x) => x !== val));
    }

    function handleDelete(val) {
        const updatedSelected = selected.filter((x) => x !== val);
        SetSelected(updatedSelected);
        SetOptions((prev) => [...prev, val]);
    }

    async function handleSaveToy(e) {
        e.preventDefault();
        const toyToSave = {
            id: toyToEdit.id || null,
            imgUrl: toyToEdit.imgUrl,
            name: toyToEdit.name,
            price: toyToEdit.price,
            labels: [...selected],
        };
        try {
            await saveToy(toyToSave);
            navigate('/toys');
            showSuccessMsg('toy edited !')
        } catch (error) {
            console.error('Error saving toy:', error);
        }
    }

    return (
        <div className="container form-add box-shadow" style={userStyle}>
            <h1>We edit toys here!</h1>
            <h2>{toyId ? `Editing Toy: ${toyToEdit.name}` : 'Create a New Toy'}</h2>

            <form onSubmit={handleSaveToy} >
                <div>
                    <label htmlFor="name">Toy Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name" // Matches toyToEdit property
                        value={toyToEdit.name || ''} // Fallback for undefined
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="price">Toy Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price" // Matches toyToEdit property
                        value={toyToEdit.price || ''} // Fallback for undefined
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <MultiSelect handleAdd={handleAdd} handleDelete={handleDelete} options={options} selected={selected} />
                </div>
                <button type="submit">Save Toy</button>
                <button type="button" onClick={() => navigate('/toys')}>Cancel</button>
            </form>
        </div>
    );
}
