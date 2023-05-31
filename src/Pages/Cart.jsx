import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Contextpage from '../ContextPage';
import { toast } from 'react-toastify';

const Cart = () => {

  const { user, setLoading, products, setProduct } = useContext(Contextpage);

  const CartItem = () => {
    setLoading(true);
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://book-e-sell-node-api.vercel.app/api/cart?userId=${user.id}`,
      headers: {"Content-Type": "application/json"}
    };

    axios(config)
      .then(function (response) {
        setProduct(response.data.result);
        setLoading(false)
      })
      .catch(function (error) {
        console.log(error);
    });
  }

  const RemoveItem = (removebookid) => {
    setLoading(true);
    var config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `https://book-e-sell-node-api.vercel.app/api/cart?id=${removebookid}`,
      headers: {"Content-Type": "application/json"}
    };
    
    axios(config)
    .then(function () {
      toast.success("item remove successfully")
      setLoading(false);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {
    CartItem();
  },[])

  return (
    <>
      <div className="flex justify-center flex-col items-center p-4">
        <h1 className="text-4xl font-bold text-center p-3">Your Cart</h1>
        <div className="w-40 h-1 bg-red-400 rounded-full"></div>
      </div>

      <div className="flex justify-center flex-col items-center my-10">

        <div className="">
          <ul role="list" className="divide-gray-200 w-[35rem]">
            {products.map((product) => (
              <li key={product.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={product.book.base64image}
                    alt="product"
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <h1>{product.book.name}</h1>
                      </h3>
                      <p className="ml-40">Rs.{product.book.price}</p>
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty {product.quantity}</p>

                    <div className="flex">
                      <button
                        type="button"
                        className="font-medium text-red-600 hover:text-red-300"
                        onClick={() => RemoveItem(product.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total items : {products.length}</p>
            <p>(MRP) Rs. 1000</p>
          </div>
          <div className="mt-6">
            <a
              href="#"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart