
import { useSelector } from "react-redux"

export function Profile() {

    const user = useSelector(state => state.userModule.user)


    return (
        <div>
            <h1>Home </h1>
            <h1>welcome {user.name}</h1>
        </div>
    )
}