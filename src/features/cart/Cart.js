import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteItemsFromCartAsync,
  fetchItemsByUserIdAsync,
  selectCartItems,
  updateCartAsync,
} from "./CartSlice";
import { Link, Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../auth/authSlice";
import Modal from "../common/Modal";

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const user = useSelector(selectLoggedInUser);

  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(-1);

  const totalAmount = cartItems.reduce(
    (amount, item) =>
      Math.round(
        item.product.price * (1 - item.product.discountPercentage / 100)
      ) *
        item.quantity +
      amount,
    0
  );
  const totalItems = cartItems.reduce(
    (amount, item) => item.quantity + amount,
    0
  );

  const handleQuantity = (e, item) => {
    // e.preventDefault();
    const userId = user.id;

    item = { ...item, quantity: +e.target.value };
    dispatch(updateCartAsync({ item }));
  };

  const handleDelete = (e, product) => {
    const userId = user.id;
    const itemId = product.id;
    dispatch(deleteItemsFromCartAsync({ itemId, userId }));
  };

  useEffect(() => {
    dispatch(fetchItemsByUserIdAsync(user.id));
  }, [dispatch]);

  return (
    <>
      {!cartItems.length && <Navigate to="/login" replace={true}></Navigate>}

      {cartItems && (
        <div className="mx-auto my-5 bg-white max-w-7xl p-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
            Cart
          </h1>
          <div className="mt-4">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItems.map((product) => (
                  <li key={product.product.id} className="flex py-6 my-4">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.product.thumbnail}
                        alt={product.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={product.href}>{product.title}</a>
                          </h3>
                          <span>
                            {" "}
                            <p className="text-sm font-medium text-gray-400 line-through">
                              ${product.product.price}
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              $
                              {Math.round(
                                product.product.price *
                                  (1 - product.product.discountPercentage / 100)
                              )}
                            </p>
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.product.color}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex w-32 items-center justify-between text-gray-500 ">
                          Qty:{" "}
                          <select
                            value={product.quantity}
                            onChange={(e) => handleQuantity(e, product)}
                            className="!appearance-none  w-20 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option value="1">1 </option>
                            <option value="2">2 </option>
                            <option value="3">3 </option>
                            <option value="4">4 </option>
                            <option value="5">5 </option>
                          </select>
                        </div>

                        <Modal
                          title={`Delete Cart Item ${product.product.title}`}
                          message={`Are you sure you want to delete ${product.product.title} ?`}
                          dangerOption="Delete"
                          cancelOption="Cancel"
                          cancelAction={() => setShowModal(-1)}
                          dangerAction={(e) => handleDelete(e, product.product)}
                          showModal={showModal === product.product.id}
                        />
                        <div className="flex">
                          <button
                            type="button"
                            onClick={() => setShowModal(product.product.id)} // Use a function to capture the current product id
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
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
              <p>${totalAmount}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Total Items</p>
              <p>{totalItems}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Link
                to="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <Link to="/">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => setOpen(false)}
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
