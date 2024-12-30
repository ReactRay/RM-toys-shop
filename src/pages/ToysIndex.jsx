
import { Link } from "react-router-dom"
import { ToysList } from "../cmps/ToysList"
import { Filter } from "../cmps/Filter"
import { setFilterBy } from "../store/toys/toys.actions"
import { debounce } from "../services/util.service"
import { useReducer, useRef } from "react"
import { useSelector } from "react-redux"
export function ToysIndex() {
    const onSetFilterByDebounce = useRef(debounce(onFilter, 1000)).current

    const user = useSelector(s => s.userModule.user)

    async function onFilter(filterBy) {
        await setFilterBy(filterBy)

    }



    return (
        <div className="container">
            <h1>Toys for everyone</h1>

            <Filter onFilter={onSetFilterByDebounce} />

            <ToysList />
            <div className="container">
                {user.isAdmin ? <Link to={'/add'}>add toy</Link> : ''}
                <Link to={'/profile'}>back to profile</Link>
            </div>

        </div>
    )
}