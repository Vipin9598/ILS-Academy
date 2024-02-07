 import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
    cart:localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[],
    total:localStorage.getItem("total")?JSON.parse(localStorage.getItem("total")):0,
    totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")):0,
};

const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        addToCart:(state,action)=>{
            const course = action.payload
            const index = state.cart.findIndex((item)=>item._id === course._id)
            if(index>=0){
                toast.error("Course Already In cart")
                return;
            } 
                
            state.cart = [...state.cart,{...course}]
            state.totalItems++
            state.total += course.price

            localStorage.setItem("cart",JSON.stringify(state.cart))
            localStorage.setItem("total",JSON.stringify(state.total))
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems))

            toast.success("Course Added to Cart")
            
            
        },
        removeFromCart:(state,value)=>{
            const courseId = value.payload
            const index =  state.cart.findIndex((item)=>item._id === courseId)
            if(index>=0){
                state.totalItems--
                state.total -= state.cart[index].price
                state.cart.splice(index,1)
                localStorage.setItem("cart",JSON.stringify(state.cart))
                localStorage.setItem("total",JSON.stringify(state.total))
                localStorage.setItem("totalItems",JSON.stringify(state.totalItems))
                toast.success("course removed from cart")
            }
        },
        resetCart:(state)=>{
            state.total=0
            state.totalItems=0
            state.cart=[]
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")

        }
    }

})

export const {addToCart,removeFromCart,resetCart} = cartSlice.actions
export default cartSlice.reducer