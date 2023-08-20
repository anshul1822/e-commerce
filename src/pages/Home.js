import React, { useEffect } from "react";
import NavBar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
import { fetchItemsByUserId } from "../features/cart/CartAPI";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../features/common/Footer";

function Home() {
  return (
    <>
      <NavBar>
        <ProductList />
      </NavBar>
      <Footer />
    </>
  );
}

export default Home;
