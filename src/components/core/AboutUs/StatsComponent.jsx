import React from 'react'

const statsData =[
    {
        count:"5K",label:"Active Students"
    },
    {
        count:"10+",label:"Mentors"
    },
    {
        count:"200+",label:"Courses"
    },
    {
        count:"50+",label:"Awards"
    }
]
const StatsComponent = () => {
  return (
    <div>
        <div className='text-richblack-5 grid md:grid-cols-4 grid-cols-2  lg:grid-rows-1 grid-rows-2 gap-y-5 gap-x-5'>
      {
        statsData.map((data,index)=>{
            return(
                <div key={index} className=' flex flex-col gap-5 text-center'>
                    <h1 className='text-2xl text-center'>{data.count}</h1>
                    <p className='text-richblack-300 text-xl'>{data.label}</p>
                </div>
                )
            })
        }
        </div>
    </div>
  )
}

export default StatsComponent
