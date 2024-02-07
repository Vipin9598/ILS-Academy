import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";
import { setLoading } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/profileSlice";


const {COURSE_PAYMENT_API,SEND_PAYMENT_SUCCESS_EMAIL_API,COURSE_VERIFY_API} = studentEndpoints

function loadScript(src){
    return new Promise((resolve)=>{
        const script = document.createElement("script")
        script.src=src;

        script.onload = () =>{
            resolve(true)
        }
        script.onerror=()=>{
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

export async function buyCourse(token,courses,user,navigate,dispatch){
    const toastId = toast.loading("Loading....")
    console.log("courses.............",courses)
    
    dispatch(setLoading(true))
    const userDetail = user
    try{
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js") 
        if(!res){
            toast.error("Razorpay SDk  failed to load")
            return
        }

        const orderResponse = await apiConnector("POST",COURSE_PAYMENT_API,
                                            {courses},
                                            {
                                                Authorization: `Bearer ${token}`
                                            }
        )
        console.log("pehla step complete")
        // console.log("dekhte h...",req.user.id)
        const userId = orderResponse.data.userId

        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message)
        }
        console.log("response aa gya capture payment ka ",orderResponse)

        const options = {
            key:process.env.REACT_APP_RAZORPAY_KEY,
            currency:orderResponse.data.data.currency,
            amount:`${orderResponse.data.data.amount}`,
            order_id:orderResponse.data.data.id,
            name:"Study-Notion",
            description:"Happy Journey towards your better future",
            prefill:{
                name:`${userDetail.firstName} ${userDetail.lastName} `,
                email:userDetail.email
            },
            handler:async function(response){
                 //sending mail 
                 await sendPaymentSuccessEmail({response},orderResponse.data.data.amount,token,dispatch)  
                // verifypayment
               await verifyPayment({...response,courses},token,navigate,dispatch);
                
                                
            }

        }

        const paymentObject = new window.Razorpay(options)
        paymentObject.open();
        paymentObject.on("payment.failed",function(response){
            toast.error("oops payment failed")
            console.log(response.error,"jai baaba ki ")
        })

        console.log("Window step complete")
    } catch(error){
        console.log("Payment Api eror....",error)
        toast.error("could not make payment")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
    // return ka dekhte h kya krna h 
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment...")
    dispatch(setPaymentLoading(true))
    try {
      const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
        Authorization: `Bearer ${token}`,
      })

      console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", response)
      dispatch(setUser(response.data.data))
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
  
      toast.success("Payment Successful. You are Added to the course ")
      navigate("/dashboard/enrolled-courses")
      dispatch(resetCart())
    } catch (error) {
      console.log("PAYMENT VERIFY ERROR............", error)
      toast.error("Could Not Verify Payment.")
    }
    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false))
  }
  
const sendPaymentSuccessEmail = async(response,amount,token,dispatch) =>{
    console.log("response",response)
    dispatch(setLoading(true))
    const toastId = toast.loading("Sending Mail....")
    try{
        await apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
            orderId:response.response.razorpay_order_id,
            paymentId:response.response.razorpay_payment_id            ,
            amount,
        },{ Authorization:`Bearer ${token}`})

    } catch(error){
        console.log("payment successful email api error ......",error)
    }
    
    toast.dismiss(toastId)
    dispatch(setLoading(false))
}