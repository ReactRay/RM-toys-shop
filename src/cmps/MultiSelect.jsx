import { useState } from "react"


const arr = ['1', '2', '3']

export function MultiSelect() {

    const [options, SetOptions] = useState(arr || [])
    const [selected, SetSelected] = useState([])


    function handleAdd(val) {
        SetSelected((prev) => [...prev, val])
        SetOptions((prev) => prev.filter(x => x !== val))
    }

    function handleDelete(val) {
        SetOptions(prev => [...prev, val])
        SetSelected(prev => prev.filter(x => x !== val))
    }


    return (
        <>
            <div className="multi">
                {options.map((val, idx) => { return (<div className="multi-el" onClick={() => handleAdd(val)} key={idx + val}>{val}</div>) })}
            </div>

            <div className="multi">{selected.map((val, idx) => { return (<div className="multi-el" onClick={() => handleDelete(val)} key={idx + val}>{val}</div>) })}</div>
        </>
    )
}