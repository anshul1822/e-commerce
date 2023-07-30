import React from 'react'
import NavBar from '../features/navbar/Navbar'
import { Counter } from '../features/product-list/components/ProductList'

function Home() {
  return (
    <NavBar>
        <Counter/>
    </NavBar>
  )
}

export default Home