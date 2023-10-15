import React, { useEffect } from 'react'
import { selectLoggedInUserToken, signOutAsync } from '../authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const Logout = () => {

    const dispatch = useDispatch();
    const userToken = useSelector(selectLoggedInUserToken);

    useEffect(() => {
        dispatch(signOutAsync());
    })

    //but useEffect runs after render. so we have to delay navigate part

  return (
    <>
     { !userToken && <Navigate to='/login' replace={true}></Navigate>}
    </>
   
  )
}

export default Logout