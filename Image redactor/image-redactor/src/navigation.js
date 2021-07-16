import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from './Context'
import Main from './pages/Main'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'

const Navigation = () => {
    const context = useContext(UserContext)
    const loggedIn = context.loggedIn
    const [user] = useAuthState(auth)

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    {loggedIn ? (<Main />) : (<Redirect to="/login" />)}
                </Route>
                <Route path="/login"  >
                    {loggedIn ? (<Redirect to="/" />) : (<LoginPage />)}
                </Route>
                <Route path="/register"  >
                    {loggedIn ? (<Redirect to="/" />) : (<RegisterPage />)}
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Navigation