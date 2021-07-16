import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../Context'
import { auth } from '../firebase'

function Main() {
    const context = useContext(UserContext)
    const history = useHistory()

    const logOut = () => {
        context.logOut()
        auth.signOut()
        history.push('/login')
    }

    return (
        <div>
            <button onClick={logOut}>Logout</button>
            MAIN PAGE
        </div>
    )
}

export default Main
