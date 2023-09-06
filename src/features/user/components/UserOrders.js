import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoggedInUserOrdersAsync,
  selectLoggedInUserOrders,
} from "../userSlice";
import { selectLoggedInUser } from "../../auth/authSlice";

const UserOrders = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const orders = useSelector(selectLoggedInUserOrders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
  }, [dispatch]);

  return (
    <>
      <h1 className="text-4xl mx-auto my-5 p-2 font-bold  max-w-7xl tracking-tight text-gray-900">
        Past Orders
      </h1>
      {orders && (
        <>
          {orders?.map((order) => {
            return (
              <div
                key={order.id}
                className="mx-auto my-5 p-2 bg-white max-w-7xl px-4 sm:px-6 lg:px-8"
              >
                <h1 className="py-2 text-2xl font-bold tracking-tight text-gray-900">
                  Order Id# {order.id}
                </h1>
                <h3 className="py-2 text-l font-bold tracking-tight text-gray-900">
                  Order Status: {order.status}
                </h3>
                <h4 className="text-g font-bold tracking-tight text-gray-900">
                  {order?.selectedAddress &&
                    `Delivered To: ${order?.selectedAddress?.name}, ${order?.selectedAddress?.street}, ${order?.selectedAddress?.city}, ${order?.selectedAddress?.state}, ${order?.selectedAddress?.pinCode}`}
                </h4>
                <div className="mt-4">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {order.items.map((product) => (
                        <li key={product.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={product?.product?.thumbnail}
                              alt={product.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href={product?.proudct?.href}>
                                    {product?.product?.title}
                                  </a>
                                </h3>
                                <span>
                                  <p className="text-sm font-medium text-gray-900">
                                    $
                                    {Math.round(
                                      product?.product?.price *
                                        (1 -
                                          product?.product?.discountPercentage /
                                            100)
                                    )}
                                  </p>
                                </span>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {product?.product?.color}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                Qty : {product.quantity}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-200 py-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${order.totalAmount}</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Total Items</p>
                    <p>{order.items.length}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default UserOrders;
