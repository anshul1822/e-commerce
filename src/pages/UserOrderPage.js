import React from 'react'
import UserOrders from '../features/user/components/UserOrders'
import NavBar from '../features/navbar/Navbar'

function UserOrderPage() {
  return (
    <NavBar>
    <UserOrders/>
</NavBar>
  )
}

export default UserOrderPage