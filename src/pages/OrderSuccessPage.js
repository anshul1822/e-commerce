import React from "react";
import Order from "../features/order/Order";
import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartAsync } from "../features/cart/CartSlice";
import { selectLoggedInUserToken } from "../features/auth/authSlice";
import { deleteOrder, selectCurrentOrder } from "../features/order/orderSlice";
import { useState } from "react";

const OrderSuccessPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUserToken);
  const currrentOrder = useSelector(selectCurrentOrder);
  const [order, setOrder] = useState();

  useEffect(() => {
    //setting the order to local state
    setOrder(currrentOrder);

    //clear the order
    dispatch(deleteOrder());

    //clear the cart
    dispatch(deleteCartAsync());
  }, []);

  // console.log("Order Success Page", order);

  return (
    <>
      {!params.id && <Navigate to="/" replace={true}></Navigate>}
      {order && (
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-indigo-600">
              Order Successfully Placed
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Order Number: {params.id}
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              You can check your orders in My Accounts - My Orders
            </p>
            <div className="lg:col-span-2">
              <div className=" bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  Order
                </h1>
                <div className="mt-4">
                  <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200">
                      {order?.items?.map((product) => (
                        <li key={product.product.id} className="flex justify-between py-6">
                          <div className="flex">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={product.product.thumbnail}
                              alt={product.product.title}
                              className="h-full w-full object-cover object-center"
                            />
                                                        
                          </div>
                          <div className="ml-5">{product.product.title}</div>
                          </div>

                          <div className="ml-4 flex flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <span>
                                  {" "}
                                  <p className="text-sm font-medium text-gray-400 line-through">
                                    ${product.product.price}
                                  </p>
                                  <p className="text-sm font-medium text-gray-900">
                                    $
                                    {Math.round(
                                      product.product.price *
                                        (1 -
                                          product.product.discountPercentage /
                                            100)
                                    )}
                                  </p>
                                </span>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {product.color}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                Qty {product.quantity}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-500 py-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${order.totalAmount}</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Total Items</p>
                    <p>{order.totalItems}</p>
                  </div>
                  <p className="mt-0.5 py-3 border-t border-gray-500 text-lg text-gray-500">
                    Shipping Address
                  </p>
                  <div className="mt-6">
                  <div
                    key={order.selectedAddress.email}
                    className="flex justify-between gap-x-6 py-5"
                  >
                    <div className="flex gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="font-semibold leading-6 text-gray-900">
                          {order.selectedAddress.name}
                        </p>
                        <p className="mt-1 truncate leading-5 text-gray-500">
                          {order.selectedAddress.email}
                        </p>
                        <p className="mt-1 truncate  leading-5 text-gray-500">
                          {order.selectedAddress.phone}
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                          <div>
                            {order.selectedAddress.street}
                          </div>
                          <div>
                            {order.selectedAddress.city}
                          </div>
                          <div>
                            {order.selectedAddress.state}
                          </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </Link>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default OrderSuccessPage;
