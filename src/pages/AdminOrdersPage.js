import React, {useEffect} from 'react'
import NavBar from '../features/navbar/Navbar'
import ProductList from '../features/product/components/ProductList'
import { fetchItemsByUserId } from '../features/cart/CartAPI';
import { selectLoggedInUser } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import AdminOrders from '../features/admin/components/AdminOrders';

function AdminOrdersPage() {

  return (
    <NavBar>
        <AdminOrders/>
    </NavBar>
  )
}

export default AdminOrdersPage