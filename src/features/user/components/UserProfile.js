import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  fetchLoggedInUserAsync,
  selectLoggedInUserData,
  updateUserAsync,
} from "../userSlice";
import { selectLoggedInUser } from "../../auth/authSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [addNewAddressFlag, setAddNewAddressFlag] = useState(false);

  //TODO : We will add payment section when we work on backend

  const userData = useSelector(selectLoggedInUserData);

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...user, addresses: [...user.addresses] }; //create a shallow copy
    newUser.addresses.splice(selectedEditIndex, 1, addressUpdate);

    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
  };

  const handleRemove = (index) => {
    const newUser = { ...user, addresses: [...user.addresses] }; //create a shallow copy
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  const handleEditForm = (index) => {
    setSelectedEditIndex(index);
    const address = user.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("phone", address.phone);
    setValue("pinCode", address.pinCode);
  };

  const handleAdd = (data) => {

    const newUser = { ...user, addresses: [...user.addresses, data] }; 

    dispatch(updateUserAsync(newUser));
    setAddNewAddressFlag(false);
  }

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchLoggedInUserAsync(user.id));
  }, []);

  return (
    <>
      <>
        <h1 className="text-4xl mx-auto my-5 p-2 font-bold  max-w-7xl tracking-tight text-gray-900">
          My Profile
        </h1>

        <div className="mx-auto my-5 p-2 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Name : {userData.name ? userData.name : "New User"}
          </h1>
          <h3 className="text-xl font-bold tracking-tight text-gray-900">
            Email : {userData.email}
          </h3>
          {
            user.role === 'admin' && 
            <h3 className="text-xl font-bold tracking-tight text-gray-900">
            role : {userData.role}
          </h3>
          }

          <div className="mt-4">
            <div className="flow-root"></div>
          </div>

          <div className="border-t border-gray-200 py-6">
            {addNewAddressFlag && (
              <form
                noValidate
                onSubmit={handleSubmit((data) => {
                    console.log(data);
                  handleAdd(data);
                  reset();
                })}
              >
                <h2 className="text-2xl font-semibold leading-7 text-gry-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  {" "}
                  Use a permanent address where you can receive email
                </p>
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Full Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("name", {
                          required: "name is required",
                          pattern: {
                            value: /^(([A-Za-z]+)(\s[A-Za-z]+)?)$/gm,
                            message: "special characters not allowed",
                          },
                        })}
                        //value={address.fullname}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        {...register("email", {
                          required: "email is required",
                          pattern: {
                            value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                            message: "email not valid",
                          },
                        })}
                        type="email"
                        //value={address.email}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone
                    </label>
                    <div className="mt-2">
                      <input
                        id="phone"
                        {...register("phone", {
                          required: "phone is required",
                        })}
                        type="tel"
                        //value={address.phone}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("street", {
                          required: "street is required",
                        })}
                        //value={address.street}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("city", {
                          required: "city is required",
                        })}
                        //value={address.city}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("state", {
                          required: "state is required",
                        })}
                        //value={address.state}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("pinCode", {
                          required: "pincode is required",
                        })}
                        //value={address.pinCode}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  {/* <button
              type="button"
              onClick={() => reset()}
              className="text-sm font-semibold leading-6 text-gray-900"
              >
              Reset
              </button> */}
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save Address
                  </button>
                  <button
                    type="submit"
                    onClick={() => setAddNewAddressFlag(false)}
                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
            {!addNewAddressFlag && (
              <button
                type="submit"
                onClick={() => {
                //   console.log("click");
                  setAddNewAddressFlag(true);
                  setSelectedEditIndex(-1);
                }}
                className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add New Address
              </button>
            )}
            <ul role="list" className="divide-y divide-gray-100">
              {userData.addresses?.map((address, index) => {
                return (
                  <>
                    {selectedEditIndex == index ? (
                      <form
                        noValidate
                        onSubmit={handleSubmit((data) => {
                          handleEdit(data);
                        })}
                      >
                        <h2 className="text-2xl font-semibold leading-7 text-gry-900">
                          Personal Information
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          {" "}
                          Use a permanent address where you can receive email
                        </p>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="first-name"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Full Name
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("name", {
                                  required: "name is required",
                                  pattern: {
                                    value: /^(([A-Za-z]+)(\s[A-Za-z]+)?)$/gm,
                                    message: "special characters not allowed",
                                  },
                                })}
                                //value={address.fullname}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-4">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Email address
                            </label>
                            <div className="mt-2">
                              <input
                                id="email"
                                {...register("email", {
                                  required: "email is required",
                                  pattern: {
                                    value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                                    message: "email not valid",
                                  },
                                })}
                                type="email"
                                //value={address.email}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="phone"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Phone
                            </label>
                            <div className="mt-2">
                              <input
                                id="phone"
                                {...register("phone", {
                                  required: "phone is required",
                                })}
                                type="tel"
                                //value={address.phone}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="col-span-full">
                            <label
                              htmlFor="street-address"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Street address
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("street", {
                                  required: "street is required",
                                })}
                                //value={address.street}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2 sm:col-start-1">
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              City
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("city", {
                                  required: "city is required",
                                })}
                                //value={address.city}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="region"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              State / Province
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("state", {
                                  required: "state is required",
                                })}
                                //value={address.state}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="postal-code"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              ZIP / Postal code
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("pinCode", {
                                  required: "pincode is required",
                                })}
                                //value={address.pinCode}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                          {/* <button
type="button"
onClick={() => reset()}
className="text-sm font-semibold leading-6 text-gray-900"
>
Reset
</button> */}
                          <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Save Address
                          </button>
                          <button
                            type="submit"
                            onClick={() => setSelectedEditIndex(-1)}
                            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : null}
                    <li
                      key={address.email}
                      className="flex justify-between gap-x-6 py-5"
                    >
                      <div className="flex gap-x-4">
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {address.fullname}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {address.email}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {address.street}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {address.pinCode}
                          </p>
                        </div>
                      </div>
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <div className="mt-1 flex items-center gap-x-1.5">
                          Phone: {address.phone}
                        </div>
                        <div className="mt-1 flex items-center gap-x-1.5">
                          {address.state}
                        </div>
                        <div className="flex justify-between">
                          {/* <div className="flex"> */}
                          <button
                            type="button"
                            onClick={(e) => handleEditForm(index)}
                            className="font-medium rounded-md m-1 p-1 text-white bg-indigo-600 hover:text-indigo-500 hover:bg-white"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleRemove(e, index)}
                            className="font-medium rounded-md m-1 p-1 text-white bg-red-600 hover:text-red-500 hover:bg-white"
                          >
                            Remove
                          </button>
                          {/* </div> */}
                        </div>
                      </div>
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
        </div>
      </>
    </>
  );
};

export default UserProfile;
