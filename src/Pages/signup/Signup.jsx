import React,{useContext,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import '../Login/login.css'
import { useForm } from 'react-hook-form'
import {signupResolver} from '../../utils/singupResolver/singupResolver'
 import {auth} from '../../utils/firbase/firebase'
import {authProvider} from '../../Component/AuthProvider/Provider'


const Signup = () => {
const navigate=useNavigate();
const {user}=useContext(authProvider)
 const {handleSubmit,register,setError,clearErrors,formState:{errors,isSubmitting}}= useForm({resolver:signupResolver})
 const onSubmit=({email,password})=>{
  auth.createUserWithEmailAndPassword(email,password).then(()=>{
    clearErrors("API_ERROR")
    navigate('/dashboard')
  }).catch((err)=>{
    setError("API_ERROR",{
      message:err.message
    } )
  })
   
 }

useEffect(() => {
 if(user) {
  navigate('/dashboard')
 }
}, [user,navigate])

  return (
    <div className="container">
    <div className="screen">
      <div className="screen__content">
        <form className="login" onSubmit={handleSubmit(onSubmit)}>
          <div className="login__field">
            <i className="login__icon fas fa-user"></i>
            <input type="text" className="login__input" placeholder="User name / Email" {...register('email')} />
            <p style={{color:'red', fontSize:'14px'}}>{errors.email && errors.email.message}</p>
          </div>
          <div className="login__field">
            <i className="login__icon fas fa-lock"></i>
            <input type="password" className="login__input" placeholder="Password" {...register('password')}/>
            <p style={{color:'red', fontSize:'14px'}}>{errors.password && errors.password.message}</p>
          </div>
          <div className="login__field">
            <i className="login__icon fas fa-lock"></i>
            <input type="password" className="login__input" placeholder="Confirm Password" {...register('confirm_password')} />
            <p style={{color:'red', fontSize:'14px'}}>{errors.confirm_password && errors.confirm_password.message}</p>
          </div>
          <div>
            <p style={{color:'red', fontSize:'14px'}}>{errors.API_ERROR && errors.API_ERROR.message}</p>
          </div>
          <button className="button login__submit">
            <span className="button__text">Sign up</span>
            <i className="button__icon fas fa-chevron-right"></i>
          </button>
          <br />
          <div>
            <span className="button__text__login">Already Registered ?</span>
            <Link to="/login">
             Login here!
            </Link>
          </div>
        </form>
      </div>
      <div className="screen__background">
        <span className="screen__background__shape screen__background__shape4"></span>
        <span className="screen__background__shape screen__background__shape3"></span>
        <span className="screen__background__shape screen__background__shape2"></span>
        <span className="screen__background__shape screen__background__shape1"></span>
      </div>
    </div>
  </div>
  )
}

export default Signup