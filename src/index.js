import React from "react";
import ReactDOM from 'react-dom'
import App from "./App";
import { AuthProvider } from "./Content/auth-content";


ReactDOM.render(
    <AuthProvider>
        <App />
    </AuthProvider>
    , document.getElementById('root'))