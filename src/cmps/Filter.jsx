import { useEffect, useState } from 'react';
import { MultiSelect } from "./MultiSelect";
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const arr = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered'];

export function Filter({ onFilter }) {
    const [filterBy, setFilterBy] = useState({ name: '', price: '', labels: [] });
    const [options, SetOptions] = useState(arr || []);
    const [selected, SetSelected] = useState([]);
    const [sortByPrice, setSortByPrice] = useState(false);
    const userStyle = useSelector(state => state.userModule.user.prefs)


    const navigate = useNavigate();

    function handleAdd(val) {
        const updatedSelected = [...selected, val];
        SetSelected(updatedSelected);
        SetOptions((prev) => prev.filter((x) => x !== val));
        setFilterBy((prev) => ({ ...prev, labels: updatedSelected }));
    }

    function handleDelete(val) {
        const updatedSelected = selected.filter((x) => x !== val)
        SetSelected(updatedSelected);
        SetOptions((prev) => [...prev, val]);
        setFilterBy((prev) => ({ ...prev, labels: updatedSelected }));
    }

    function handleSortChange(e) {
        setSortByPrice(e.target.checked)
        setFilterBy((prev) => ({
            ...prev,
            sortByPrice: e.target.checked,
        }));
    }

    useEffect(() => {
        onFilter(filterBy);
    }, [filterBy]);

    return (
        <div className='filter-container box-shadow' style={userStyle}>
            <h3>Filter Options for now 😊</h3>
            <form className='flex-form' >
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={filterBy.name}
                        onChange={(e) => setFilterBy((prev) => ({ ...prev, name: e.target.value }))}
                    />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={filterBy.price}
                        onChange={(e) => setFilterBy((prev) => ({ ...prev, price: e.target.value }))}
                    />
                </div>
                <div>
                    <MultiSelect handleAdd={handleAdd} handleDelete={handleDelete} options={options} selected={selected} />
                </div>
                <div>
                    <label htmlFor="">Sort by price: </label>
                    <input type="checkbox" checked={sortByPrice} onChange={handleSortChange} />
                </div>
            </form>
        </div>
    );
}
