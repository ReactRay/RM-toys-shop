
import { ToysList } from "../cmps/ToysList"
import { Filter } from "../cmps/Filter"
import { setFilterBy } from "../store/toys/toys.actions"
import { debounce } from "../services/util.service"
import { useRef } from "react"
import { useSelector } from "react-redux"
import { Profile } from "./Profile"
export function ToysIndex() {
    const onSetFilterByDebounce = useRef(debounce(onFilter, 1000)).current
    const toys = useSelector(state => state.toyModule.toys)
    const userStyle = useSelector(state => state.userModule.user.prefs)


    async function onFilter(filterBy) {
        await setFilterBy(filterBy)

    }



    return (
        <div className="container">
            <Profile userStyle={userStyle} />


            <Filter onFilter={onSetFilterByDebounce} />

            <ToysList toys={toys} />


        </div>
    )
}