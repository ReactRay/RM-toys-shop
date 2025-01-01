/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { MultiSelect } from "./MultiSelect"
import { useNavigate } from 'react-router';


const arr = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']

export function Filter({ onFilter }) {
    const [filterBy, setFilterBy] = useState({ name: '', price: '' });
    const [options, SetOptions] = useState(arr || [])
    const [selected, SetSelected] = useState([])

    const navigate = useNavigate()


    function handleAdd(val) {
        const updatedSelected = [...selected, val]; // Compute the new selected array
        SetSelected(updatedSelected);
        SetOptions((prev) => prev.filter((x) => x !== val));
        setFilterBy((prev) => ({ ...prev, labels: updatedSelected })); // Use updatedSelected
    }

    function handleDelete(val) {
        const updatedSelected = selected.filter((x) => x !== val); // Compute the new selected array
        SetSelected(updatedSelected);
        SetOptions((prev) => [...prev, val]);
        setFilterBy((prev) => ({ ...prev, labels: updatedSelected })); // Use updatedSelected
    }

    useEffect(() => {
        onFilter(filterBy)
    }, [filterBy])




    return (
        <div className='filter-container box-shadow' >
            <h3>Filter Options for now 😊</h3>
            <form className='flex-form'>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={filterBy.name}
                        onChange={(e) => setFilterBy(prev => ({ ...prev, name: e.target.value }))}
                    />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={filterBy.price}
                        onChange={(e) => setFilterBy(prev => ({ ...prev, price: e.target.value }))}
                    />
                </div>
                <div>
                    <MultiSelect handleAdd={handleAdd} handleDelete={handleDelete} options={options} selected={selected} />

                </div>


            </form>
        </div>
    );
}
