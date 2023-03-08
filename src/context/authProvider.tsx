import { userDefaultContext } from '@/interfaces/user';
import react , {createContext, useReducer} from 'react';
import { authReducer, initialState } from './reducers/auth.reducer';
import { Outlet } from 'react-router-dom'
interface defaultContext {
  state:initialState,
  dispatch: ({type,payload}:{type:string,payload:any}) => void
}
const defaultValue : defaultContext  = {
    state : {
        user:{
            id:'1',
            username:'Nam',
            age:'25',
            email:'nam123@gmail.com',
            gender:'male',
            phone:'0123456789'
        },
        error:null,
        isLoading:false
    },
    dispatch:() => {}
}
export const AuthContext = createContext(defaultValue);

export const AuthProvider = ({children}) => {
    // (if dont use store management like as redux ... we are will use Context Api)
    // handle get user in here, when login success after push in here
    const initialState : initialState = {
        isLoading:false,
        error:null,
        user:defaultValue.state.user
    }
    const [state,dispatch] = useReducer(authReducer,initialState)
    return (
        <AuthContext.Provider value={{state,dispatch}}>
           <Outlet/>
        </AuthContext.Provider>
    )
}

