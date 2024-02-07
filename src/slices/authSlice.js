import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    loading:false,
    isBlurred:false,
    signUpData:null,
    token : localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")):null
};

const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setToken(state,value){
            state.token = value.payload
        },
        setLoading(state,value){
            state.loading=value.payload
        },
        setSignUpData(state,value){
            state.signUpData=value.payload
        },
        setIsBlurred(state,value){
            state.isBlurred=value.payload
        }
    }
})

export const {setToken,setLoading,setSignUpData,setIsBlurred} = authSlice.actions
export default authSlice.reducer