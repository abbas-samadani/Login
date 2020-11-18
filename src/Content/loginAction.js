import { actionType } from './reducer';

export function LoginRequestAction(){
    return {
        type: actionType.LOGIN_REQUEST,
    }
}

export async function LoginSuccessAction(token , data){
    return {        
        type : actionType.LOGIN_SUCCESS,
        payload: {
            user: data,
            token: token
        }
    }
}