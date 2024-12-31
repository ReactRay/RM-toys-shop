
import { Link } from "react-router-dom"
import { ToysList } from "../cmps/ToysList"
import { Filter } from "../cmps/Filter"
import { setFilterBy } from "../store/toys/toys.actions"
import { debounce } from "../services/util.service"
import { useReducer, useRef } from "react"
import { useSelector } from "react-redux"
import { Profile } from "./Profile"
export function ToysIndex() {
    const onSetFilterByDebounce = useRef(debounce(onFilter, 1000)).current

    const user = useSelector(s => s.userModule.user)

    async function onFilter(filterBy) {
        await setFilterBy(filterBy)

    }



    return (
        <div className="container">
            <Profile />


            <Filter onFilter={onSetFilterByDebounce} />

            <ToysList />


        </div>
    )
}