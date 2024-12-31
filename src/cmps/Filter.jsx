/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

export function Filter({ onFilter }) {
    const [filterBy, setFilterBy] = useState({ name: '', price: '' });

    useEffect(() => {
        onFilter(filterBy)
    }, [filterBy])




    return (
        <div className='filter-container box-shadow' >
            <h3>Filter Options for now 😊</h3>
            <form >
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

            </form>
        </div>
    );
}
