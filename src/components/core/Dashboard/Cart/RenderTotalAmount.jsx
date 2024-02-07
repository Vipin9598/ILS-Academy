import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Iconbtn from '../Iconbtn'
import { buyCourse } from '../../../../services/operations/PaymentAPI'
import { useNavigate } from 'react-router-dom'

const RenderTotalAmount = () => {
    const {total,cart} = useSelector((state)=>state.cart)
    const {token} = useSelector((state)=>state.auth)
    const {user} = useSelector((state)=>state.profile)
    const navigate=useNavigate()
    const dispatch= useDispatch()

    const handleBuyCourse =() =>{
        const courses = cart.map((course)=>course._id)
        console.log("bought courses :",courses)
        // api integrate krna h 
        if (token) {
          buyCourse(token, courses, user, navigate, dispatch);
          return;
        }
    }
  return (
    <div>
      <div className='flex lg:flex-col gap-6 bg-richblack-600 xl:px-10 lg:px-4 xl:py-5 lg:py-3 py-3 px-1 rounded-lg'>
        <div className='flex lg:flex-col  gap-2 dm:text-xl text-[15px]'>
        <p>Total :</p>
        <p>Rs. {total}</p>
        </div>

        <Iconbtn
            text="Buy Now"
            customClasses="w-full text-center justify-center w-[6rem] items-center"
            onclick={handleBuyCourse}
        />
      </div>
    </div>
  )
}

export default RenderTotalAmount
