import React, { useState, useEffect } from 'react'
import { useAuthDispach } from '../../Content/auth-content'
import './style.css'
import axios from 'axios'
import { actionType } from '../../Content/reducer';


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    const dispatch = useAuthDispach()
    const fetchToken = async (username, password) => {
        return axios.post('http://localhost:3001/login', {
            username,
            password
        }).then(response => response.data)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchToken(username, password)
            .then(({ data, success }) => {
                if (success) {
                    setToken(data)
                }
            }
            )
    }

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
                    dispatch({
                        type: actionType.LOGIN_SUCCESS,
                        payload: {
                            user: data,
                            token
                        }
                    })
                }
            }
            )
    }, [token, dispatch])


    return (
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
        </div>
    )
}
