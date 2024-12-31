import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toyService } from "../services/toys.service";
import { saveToy } from "../store/toys/toys.actions";

export function EditToy() {
    const [toyToEdit, setToyToEdit] = useState({ name: '', price: '' });
    const { toyId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (toyId) loadToy(toyId);
    }, [toyId]);

    async function loadToy(id) {
        try {
            const toy = await toyService.getById(id);
            setToyToEdit(toy || { name: '', price: '' }); // Fallback for non-existent toy
        } catch (error) {
            console.error('Error loading toy:', error);
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setToyToEdit((prevToy) => ({
            ...prevToy,
            [name]: value, // Dynamically update the field
        }));
    }

    async function handleSaveToy(e) {
        e.preventDefault();
        const toyToSave = {
            id: toyToEdit.id || null, // If creating a new toy, `id` can be null
            name: toyToEdit.name,
            price: toyToEdit.price,
            labels: toyToEdit.labels,
        };
        try {
            await saveToy(toyToSave);
            navigate('/toys'); // Navigate back to the toys list
        } catch (error) {
            console.error('Error saving toy:', error);
        }
    }

    return (
        <div className="container form-add box-shadow">
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
                <button type="submit">Save Toy</button>
                <button type="button" onClick={() => navigate('/toys')}>Cancel</button>
            </form>
        </div>
    );
}
