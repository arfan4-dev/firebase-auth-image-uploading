import React,{useContext} from 'react'
import { authProvider } from './Provider'
import { Routes,Route, Navigate } from 'react-router-dom'

const ProtectedRoute = ({component:Component, ...restProps}) => {
    const {user}=useContext(authProvider)
  return <React.Fragment>
    <Route {...restProps} render={(...props)=>{
        return user? <Component {...props }/> : <Navigate to='/login' />
    }} />
  </React.Fragment> 
  
}

export default ProtectedRoute