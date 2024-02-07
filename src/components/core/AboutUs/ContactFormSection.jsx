import React from 'react'
import ContactUsForm from './ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='text-richblack-5 mb-12 '>
      <div className='flex flex-col gap-8 lg:w-[40%] md:w-[60%] sm:w-[75%] w-[90%] mx-auto'>
        <p className='text-4xl font-bold text-center'>Get in Touch</p>
        <p className='text-xl text-center'>We’d love to here for you, Please fill out this form.</p>
        <div>
          <ContactUsForm />
        </div>
      </div>
    </div>
  )
}

export default ContactFormSection
