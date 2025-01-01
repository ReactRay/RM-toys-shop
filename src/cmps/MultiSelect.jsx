import { useSelector } from "react-redux"

export function MultiSelect({ handleAdd, handleDelete, options, selected }) {

    const userStyle = useSelector(state => state.userModule.user.prefs)
    return (
        // style = { userStyle }
        <div className="multi-container box-shadow " >
            <div className='multi-background' ></div>
            <h3>select labels for the toy:</h3>

            <div className="multi box-shadow">
                {options.map((val, idx) => { return (<div className="multi-el" onClick={() => handleAdd(val)} key={idx + val} >{val}</div>) })}
            </div>

            <div className="multi box-shadow">{selected.map((val, idx) => { return (<div className="multi-el" onClick={() => handleDelete(val)} key={idx + val}>{val}</div>) })}</div>
        </div>
    )
}