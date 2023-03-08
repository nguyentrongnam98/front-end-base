
import { userDefaultContext } from '@/interfaces/user'
export interface initialState  {
    isLoading: boolean
    user: userDefaultContext
    error: null | any
}
export function authReducer(state:initialState,action){
    switch (action.type) {
        case 'LOGIN_PENDING' : return {
          ...state,
          isLoading: true
        }
        case 'LOGIN_SUCCESS': return {
            ...state,
            isLoading:false,
            user:action.payload
        }
        case 'LOGIN_ERROR': return {
            ...state,
            isLoading:false,
            error:action.payload
        }
        default: return state
    }
}