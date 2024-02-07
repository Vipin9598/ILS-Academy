import React from 'react'
import RenderCartCourses from './RenderCartCourses'
import RenderTotalAmount from './RenderTotalAmount'
import { useSelector } from 'react-redux'

const Cart = () => {
  const {isBlurred} = useSelector((state)=>state.auth)
    const {total,totalItems,cart} = useSelector((state)=>state.cart)
  return (
    <div className={`text-richblack-50 xl:w-[70%] lg:w-[80%] w-[90%] mx-auto  ${isBlurred ? "blur-sm" : ""}`}>
      <div className='flex flex-col gap-5'>
        <h1 className='text-xl font-bold text-yellow-50'>Your Cart</h1>
        <p className=' border-b py-2 text-lg'>{totalItems} courses in cart</p>
        {
            totalItems > 0 ? (
                <div className='flex lg:flex-row flex-col justify-between w-full lg:gap-0 gap-5 pb-4 '>
                    <RenderCartCourses/>
                    <RenderTotalAmount/>
                </div>
            ) : (<p>Your Cart is Empty</p>)
        }
      </div>
    </div>
  )
}

export default Cart
