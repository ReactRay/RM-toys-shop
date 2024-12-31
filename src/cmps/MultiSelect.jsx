
export function MultiSelect({ handleAdd, handleDelete, options, selected }) {


    return (
        <div className="multi-container ">
            <h3>select labels for the toy:</h3>

            <div className="multi box-shadow">
                {options.map((val, idx) => { return (<div className="multi-el" onClick={() => handleAdd(val)} key={idx + val}>{val}</div>) })}
            </div>

            <div className="multi box-shadow">{selected.map((val, idx) => { return (<div className="multi-el" onClick={() => handleDelete(val)} key={idx + val}>{val}</div>) })}</div>
        </div>
    )
}