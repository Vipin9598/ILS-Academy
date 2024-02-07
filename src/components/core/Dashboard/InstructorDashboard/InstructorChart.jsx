import React, { useState } from 'react'
import { Chart,registerables } from 'chart.js'
import {Pie} from "react-chartjs-2"
Chart.register(...registerables)
const InstructorChart = ({courses}) => {
    const [currChart,setCurrChart] = useState("Student")

    //function to generte random colors
    const getRandomColor = (numColors) => {
        const colors=[]
        for(let i=0;i<numColors;i++){
            const color = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`
            colors.push(color);
        }
        return colors
    }

    // function to generte displaying chart  student Info 

    const chartDataForStudent = {
        labels:courses.map((course)=>course.courseName),
        datasets:[
            {
                data:courses.map((course)=>course.totalStudentEnrolled),
                backgroundColor:getRandomColor(courses.length)
            }
        ]
    }

    // function to generte displaying chart  income Info 

    const chartDataForIncome = {
        labels:courses.map((course)=>course.courseName),
        datasets:[
            {
                data:courses.map((course)=>course.totalAmountGenerated),
                backgroundColor:getRandomColor(courses.length)
            }
        ]
    }

    // options
    const options = {
        
    }
  return (
    <div className='md:w-[70%] w-[100%] border rounded-lg bg-richblack-700 sm:p-3 p-1'>
      <div className='flex flex-col gap-5' >
        <div className='flex  sm:gap-10 gap-5 items-center'>
        <p className='text-xl text-yellow-300'>Visualise</p>
        <div className='flex bg-richblack-800 rounded-full sm:px-7 px-2 sm:py-2 py-1 w-fit'>
            <button onClick={()=>setCurrChart("Student")} className={`text-center rounded-full sm:px-4 px-1 py-1 ${currChart === "Student" ? "bg-richblack-700":""}`}>
                Students
            </button>
            <button onClick={()=>setCurrChart("Income")} className={`text-center rounded-full  sm:px-4 px-1 py-1 ${currChart === "Student" ? "":"bg-richblack-700"}`}>
                Income
            </button>
        </div>
        </div>

        <div className="mx-auto w-[70%]">
            <Pie
                data={currChart === "Student" ? chartDataForStudent : chartDataForIncome}
                options={options}
                
            />
        </div>
      </div>
    </div>
  )
}

export default InstructorChart
