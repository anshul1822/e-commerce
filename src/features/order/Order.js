import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectOrderedItems } from './orderSlice';

const Order = () => {

    const dispatch = useDispatch();
    const orders = useSelector(selectOrderedItems);
    console.log("orders", orders);
  return (
    <>
    <ul>
        <li>Order Page</li>
    {
        orders?.map((order, index) => {
            return <li>{order.title}</li>
        }) 
    }
    </ul>
    </>
  )
}

export default Order