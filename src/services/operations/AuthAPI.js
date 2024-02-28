import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"
// import { useDispatch } from "react-redux"


const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints


export function sendOtp(email, navigate) {
  
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)



      if (!response.data.success) {
        toast.error(response.data.message)
        throw new Error(response.data.message)  
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
      
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        email,
            firstName,
            lastName,
            password,
            confirmPassword,
            otp,
            accountType,
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
        toast.error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Try again after Some time")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    let response;
    try {
       response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {        
        throw new Error(response.data.message)    
      }
      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      dispatch(setUser({ ...response.data.user, image: userImage }))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user",JSON.stringify(response.data.user))
      // await dispatch(setUser(response.data.user))
      
     
      navigate("/dashboard/my-profile")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error(response.data.message)
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, 
        email
      );

      console.log("RESETPASSTOKEN RESPONSE............", response);

      if (response.status === 200 && response.data.success) {
        toast.success("Reset Email Sent");
        setEmailSent(true);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log("RESETPASSTOKEN ERROR:", error.response ? error.response.data.message : error.message);
      toast.error("Failed To Send Reset Email: " + (error.response ? error.response.data.message : error.message));
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}


export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      })

      console.log("RESETPASSWORD RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Password Reset Successfully")
      navigate("/login")
    } catch (error) {
      console.log("RESETPASSWORD ERROR............", error)
      toast.error("Failed To Reset ")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("cart")
    localStorage.removeItem("totalItems")
    localStorage.removeItem("total")
    toast.success("Logged Out")
    navigate("/")
  }
}

