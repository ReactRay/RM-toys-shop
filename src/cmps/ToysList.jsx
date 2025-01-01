
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { loadToys } from "../store/toys/toys.actions"
import { ToyPreview } from "./ToyPreview"

export function ToysList() {

    const userStyle = useSelector(state => state.userModule.user.prefs)

    const filterBy = useSelector(state => state.toyModule.filterBy)

    const toys = useSelector(state => state.toyModule.toys) || []
    useEffect(() => {
        onLoadToys(filterBy)
    }, [filterBy])

    async function onLoadToys(filterBy = {}) {
        await loadToys(filterBy)

    }



    return (
        <div >
            <div className="toys-flex" style={userStyle}>
                {toys.map((toy, idx) => {
                    return (<ToyPreview key={toy?.id + idx} toy={toy} />)

                })}
            </div>
        </div>
    )
}