import React from "react"

const HighlightText = (props) => {
    return (
        <span className="text-richblue-200 font-bold ">
            {/* text-gradient-to-b from-white to-blue-200 agar gradient krna ho to  */}
            {props.text}
        </span>
    )
}

export default HighlightText