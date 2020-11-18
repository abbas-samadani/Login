import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useAuthDispach, useAuthState } from '../../Content/auth-content'
import './style.css'
import axios from 'axios'
import { LoginRequestAction , LoginSuccessAction } from '../../Content/loginAction';





export default function Login() {
    
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const { loading } = useAuthState()

    const dispatch = useAuthDispach()
    const fetchToken = async (username, password) => {
        return axios.post('http://localhost:3001/login', {
            username,
            password
        }).then(response => response.data)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(LoginRequestAction())
        fetchToken(username, password)
            .then(({ data, success }) => {
                if (success) {
                    setToken(data)
                }
            }
            )
    }

    useLayoutEffect(() => {
        const token = localStorage.getItem('token')
        dispatch(LoginRequestAction())
        setToken(token)
    }, [dispatch])

    const fetchCurrentUserInfo = (token) => {
        return axios.get('http://localhost:3001/users/me', {
            headers: {
                authorization: token
            }
        }).then(response => response.data)
    }

    

    useEffect(() => {
        fetchCurrentUserInfo(token)
            .then(({ success, data }) => {
                if (success) {
                    localStorage.setItem('token', token)
                    const successAction = LoginSuccessAction(token , data);
                    successAction.then((res) => dispatch(res))                 
                }
            }
            
            )
    }, [token, dispatch])


    return (
        <>
            {loading ? <p style={{ color: "black" , fontSize: "38px"}}> LOADING </p> :
                <div className="login">
                    <h1>Login</h1>
                    <form method="post" onSubmit={handleSubmit}>
                        <input type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required="required" />
                        <input type="password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required="required" />
                        <button type="submit" className="btn btn-primary btn-block btn-large">Let me in.</button>
                    </form>
                </div>}
        </>
    )
}
