
import React,{createContext, useEffect, useState} from 'react'
import {auth} from '../../utils/firbase/firebase'
import {useNavigate} from 'react-router-dom'

export const authProvider=createContext(null)

 const AuthProvider = ({children}) => {
    const [user,setUser]=useState()
    const navigate=useNavigate();


    useEffect(() => {
      auth.onAuthStateChanged((user)=>{
        setUser(user)
      })
    }, [])
    const logout=()=>{
      auth.signOut().then(()=>{
        setUser(null);
        navigate('/login')
      })
    }
    
  return <authProvider.Provider value={{user,logout}}>
{children}
  </authProvider.Provider>
}

export default AuthProvider