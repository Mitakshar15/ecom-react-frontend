import axios from "axios"
import { API_BASE_URL } from "../../config/apiConfig"
import { REGISTER_REQUEST,LOGIN_REQUEST, REGISTER_FAILURE, LOGIN_SUCCESS, LOGIN_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE, LOGOUT, REGISTER_SUCCESS } from "./ActionType"

const token = localStorage.getItem("jwt");
//const error = localStorage.getItem("error");
const registerRequest = () =>({type:REGISTER_REQUEST});
const registerSuccess = (user) =>({type:REGISTER_SUCCESS,payload:user});
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload:error });

export const register = userData => async (dispatch)=>{
    
    dispatch(registerRequest())
 

try{
    const response  = await axios.post(`${API_BASE_URL}/auth/signup`,userData)
    const user = response.data;

    if(user.jwt){
        localStorage.setItem("jwt",user.jwt)
    }
    dispatch(registerSuccess(user.jwt))
}
catch(error){
    dispatch(registerFailure(error.message))

}

}


const loginRequest = () =>({type:LOGIN_REQUEST});
const loginSuccess = (user) =>({type:LOGIN_SUCCESS,payload:user});
const loginFailure= () =>({type:LOGIN_FAILURE,payload:error});

export const login = userData => async (dispatch)=>{
    
    dispatch(loginRequest())
 

try{
    const response  = await axios.post(`${API_BASE_URL}/auth/signin`,userData)
    const user = response.data;

    if(user.jwt){
        localStorage.setItem("jwt",user.jwt)
    }
    dispatch(loginSuccess(user.jwt))
}
catch(e){
    dispatch(loginFailure(e.message))

}

}

const getUserRequest = () =>({type:GET_USER_REQUEST});
const getUserSuccess = (user) =>({type:GET_USER_SUCCESS,payload:user});
const getUserFailure= () =>({type:GET_USER_FAILURE,payload:error});

export const getUser = userData => async (dispatch)=>{
    
    dispatch(getUserRequest())
 

try{
    const response  = await axios.post(`${API_BASE_URL}/api/users/profile`,{
        headers: {
            "Authorization": `Bearer ${token}`,
        }

    })
    const user = response.data;

    dispatch(getUserSuccess(user))
}
catch(e){
    dispatch(getUserFailure(e.message))

}

}

export const logout = ()=>(dispatch)=>{
    dispatch({type:LOGOUT,payload:null})
}