import React from 'react'
import { useAuthDispach } from '../../Content/auth-content'
import { LogoutAction } from '../../Content/loginAction'

export default function Dashboad() {

    const dispatch = useAuthDispach()

    const handleClick = () => {
        dispatch(LogoutAction())
        localStorage.removeItem('token')
    }

    return (
        <>
            <div style={{ color: "black", fontSize: "38px" }}>
                Dashboard
            </div>

            <button type="submit" onClick={handleClick} className="btn btn-primary btn-large">Logout</button>
        </>
    )
}
