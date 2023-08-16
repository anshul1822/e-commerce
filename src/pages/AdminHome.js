import React, {useEffect} from 'react'
import NavBar from '../features/navbar/Navbar'
import ProductList from '../features/product/components/ProductList'
import { fetchItemsByUserId } from '../features/cart/CartAPI';
import { selectLoggedInUser } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import AdminProductList from '../features/admin/components/AdminProductList';

function AdminHome() {

  return (
    <NavBar>
        <AdminProductList/>
    </NavBar>
  )
}

export default AdminHome