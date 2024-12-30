
export function MultiSelect({ handleAdd, handleDelete, options, selected }) {


    return (
        <>
            <div className="multi">
                {options.map((val, idx) => { return (<div className="multi-el" onClick={() => handleAdd(val)} key={idx + val}>{val}</div>) })}
            </div>

            <div className="multi">{selected.map((val, idx) => { return (<div className="multi-el" onClick={() => handleDelete(val)} key={idx + val}>{val}</div>) })}</div>
        </>
    )
}