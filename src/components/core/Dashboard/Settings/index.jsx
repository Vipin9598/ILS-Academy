import React, { useState } from 'react'
import ImageSection from './ImageSection'
import ProfileSection from './ProfileSection'
import PasswordSection from './PasswordSection'
import DeleteSection from './DeleteSection'
import { useSelector } from 'react-redux'
import ConfirmationModal from '../ConfirmationModal'

const Settings = () =>  {
  const {isBlurred} = useSelector((state)=>state.auth)
  const [confirmationModal, setConfirmationModal] = useState(null);
  return (
    <div className='relative'>
      <div   className={` text-richblack-50 relative mb-10  ${isBlurred ? "blur-sm" : ""}   xl:px-20 lg:px-10 md:px-5  sm:px-10 px-3 xl:w-[80%] lg:w-[85%] w-[97%] mx-auto`}>
      <div className='lg:w-11/12 mx-auto flex flex-col gap-5 '>
        <h1 className='text-2xl'>Edit Profile</h1>
        <ImageSection/>
         <ProfileSection/>
       <PasswordSection/>
        <DeleteSection setConfirmationModal={setConfirmationModal}/>
      </div>
      
    </div>
    <div className="absolute bottom-[30%] md:right-[30%] sm:right-[25%] right-[5%] deleteAccountModal sm:min-w-[350px] w-[250px]">
            {confirmationModal && (
              <ConfirmationModal modalData={confirmationModal} />
            )}
        </div>
    </div>
  )
}

export default Settings
