import React from 'react'
import { useSelector } from 'react-redux'

const Iconbtn = ({text,onclick,children,disabled,outline=false,customClasses,type}) => {
  const {loading} = useSelector((state)=>state.auth)
  return (
    <button disabled={loading}
            onClick={onclick}   
            type={type}
            children={children}
            className='bg-yellow-5 text-richblack-700 rounded-lg font-semibold lg:px-2 md:px-1 sm:px-2 px-1 py-1 hover:scale-95 lg:text-lg md:text-[15px] sm:text-lg text-[15px] w-fit transition-all duration-200'
        >
      {
        children ? (<>
                    <span className='flex gap-3 px-1  items-center'>
                        {text}
                        {children}
                    </span>
                   </>)
                :(<>
                    <span className=''>{text}</span>
                </>)
      }
    </button>
  )
}

export default Iconbtn
