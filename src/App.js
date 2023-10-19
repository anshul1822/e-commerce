import React, { useEffect } from 'react';
// import { Counter } from './features/counter/Counter';
import './App.css';
import Home from './pages/Home';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { fetchItemsByUserId } from './features/cart/CartAPI';
import { checkAuthAsync, selectLoggedInUserToken } from './features/auth/authSlice';
import { fetchLoggedInUserDataAsync } from './features/user/userSlice';
import { fetchCartItemsAsync } from './features/cart/CartSlice';
import PageNotFound from './pages/PageNotFound';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrderPage from './pages/UserOrderPage';
import UserProfilePage from './pages/UserProfilePage';
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminHome from './pages/AdminHome';
import AdminProductDetailPage from './pages/AdminProductDetailPage'
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import CheckoutForm from './pages/CheckoutForm';
import StripeCheckout from './pages/StripeCheckout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home></Home></Protected>,
  },
  {
    path: "/admin",
    element: <ProtectedAdmin><AdminHome></AdminHome></ProtectedAdmin>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignUpPage></SignUpPage>,
  },
  {
    path: "/cart",
    element: <Protected><CartPage></CartPage></Protected>,
  },
  {
    path: "/checkout",
    element: <Protected><Checkout></Checkout></Protected>,
  },
  {
    path: "/product-detail/:id",
    element: <Protected><ProductDetailPage></ProductDetailPage></Protected>,
  },
  {
    path: "/admin/product-detail/:id",
    element: <ProtectedAdmin><AdminProductDetailPage></AdminProductDetailPage></ProtectedAdmin>,
  },
  {
    path: "/admin/product-form",
    element: <ProtectedAdmin><AdminProductFormPage></AdminProductFormPage></ProtectedAdmin>,
  },
  {
    path: "/admin/product-form/edit/:id",
    element: <ProtectedAdmin><AdminProductFormPage></AdminProductFormPage></ProtectedAdmin>,
  },
  {
    path: "/admin/orders",
    element: <ProtectedAdmin><AdminOrdersPage/></ProtectedAdmin>,
  },
  {
    path: "/order-success/:id",
    element: <Protected><OrderSuccessPage/></Protected>,
  },
  {
    path: "/my-orders",
    element: <Protected><UserOrderPage/></Protected>,
  },
  {
    path: "/profile",
    element: <Protected><UserProfilePage/></Protected>,
  },
  {
    path: "/stripe-checkout",
    element: <Protected> <StripeCheckout/> </Protected>,
  },
  {
    path: "/logout",
    element: <Logout/>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage/>,
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);

const options = {
  timeout: 1000,
  position: positions.BOTTOM_CENTER
};

function App() {

  const dispatch = useDispatch();
  const userToken = useSelector(selectLoggedInUserToken);

  useEffect(()=> {
    dispatch(checkAuthAsync());
  },[dispatch])

  useEffect(()=>{    
    
    if(userToken){
      // console.log("user.id", user?.id);
      dispatch(fetchCartItemsAsync());
      //we can get req.user by token of backend so no need to give in front-end
      dispatch(fetchLoggedInUserDataAsync());
    } //only dispatch if the user is logged in.

  },[dispatch, userToken]);

  return (
    <div className="App">
      <Provider template={AlertTemplate} {...options}><RouterProvider router={router} /></Provider>
      
    </div>
  );
}

export default App;
