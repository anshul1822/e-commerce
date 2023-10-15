import React, { useEffect } from "react";
import NavBar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
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
