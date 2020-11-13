import React from 'react'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import { useAuthState } from './Content/auth-content'
export default function App() {
    const {token} = useAuthState()    
    return (
        <>
            {token ? <Dashboard /> : <Login />}
        </>
    )
}
