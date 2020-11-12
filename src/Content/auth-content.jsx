import React,{useReducer , useContext} from 'react'
import { reducer, initialState } from './reducer';


const AuthStateContext = React.createContext();
const AuthDispachContext = React.createContext();


export function useAuthState(){
    const context = useContext(AuthStateContext)
    if(!context){
        throw Error('useAuthState must be used with a AuthProvider ')
    }
    return context;
}

export function useAuthDispach(){
    const context = useContext(AuthDispachContext)
    if(!context){
        throw Error('useAuthDispach must be used with a AuthProvider ')
    }
    return context;
}

export function AuthProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState)
    return(               
        <AuthStateContext.Provider value={state}>
            <AuthDispachContext.Provider value={dispatch}>                
                {children}
            </AuthDispachContext.Provider>
        </AuthStateContext.Provider>
    )
}
