import React, { useState, useContext, useEffect } from 'react'
import { useMutation } from '@apollo/client';
import { Context } from '../utils/GlobalState';
import PictureDrawer from './PictureDrawer';
import generateId from '../utils/generateId';
import { loadStripe } from "@stripe/stripe-js";

import { CHECKOUT } from '../utils/mutations';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE);

function CartDrawer({ isOpen, setIsOpen }) {
  const [cartItemsState, setCartItemsState] = useContext(Context)['cartItems'];
  const [ordersState, setOrdersState] = useContext(Context)['orders'];
  const [isPictureDrawerOpen, setIsPictureDrawerOpen] = useState(false);
  const [checkout, { data, error }] = useMutation(CHECKOUT);

  const qtyOperation = (i, operation) => {
    let items = cartItemsState.cartItems;
    let qty, amount

    if (operation === 'increment') {
      qty = ++cartItemsState.cartItems[i].quantity
      amount = cartItemsState.totalAmount + parseFloat(cartItemsState.cartItems[i].unitPrice)
    } else if (operation === 'decrement') {
      qty = --cartItemsState.cartItems[i].quantity
      amount = cartItemsState.totalAmount - parseFloat(cartItemsState.cartItems[i].unitPrice)
    } else {
      qty = cartItemsState.cartItems[i].quantity
    }
    const unitPrice = parseFloat(cartItemsState.cartItems[i].unitPrice).toFixed(2);

    items[i] = { ...items[i], quantity: qty, unitPrice: unitPrice }
    setCartItemsState({
      cartItems: items,
      totalAmount: amount
    })
  };

  const calculatePrice = (item) => {
    const subTotal = parseFloat(item.quantity * item.unitPrice).toFixed(2);
    return subTotal;
  }

  const handleCheckout = () => {
    const cartItems = cartItemsState.cartItems
    let items = []
    cartItems.map(item => {
      console.log(item);
      const unitPrice = parseFloat(item.unitPrice).toFixed(2);
      items.push(
        {
          quantity: item.quantity,
          unitPrice: unitPrice,
          filename: item.filename,
          cloud_url: item.cloud_url,
          size: item.size,
          subTotal: (unitPrice*item.quantity)
        }
      )
    })
    sessionStorage.setItem('items', JSON.stringify(items))
    console.log(items)

    // window.location.href = '/success';

    checkout({ variables: { items } });
  }

  useEffect(() => {
    if (data) {
      console.log(data.createCheckoutSession.sessionId);
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.createCheckoutSession.sessionId });
      });
    }
  }, [data]);

  return (
    <><main
      className={' fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out ' +
        (isOpen
          ? ' transition-opacity opacity-100 duration-500 translate-x-0  '
          : ' transition-all delay-500 opacity-0 translate-x-full  ')}
    >
      <section
        className={'top-0 right-0 fixed w-[40vw] px-8 bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  ' +
          (isOpen ? ' translate-x-0 ' : ' translate-x-full ')}
      >
        <article className=''>
          <header className='p-4 font-bold text-lg'>My Cart</header>
          <div className='overflow-x-auto relative shadow-md sm:rounded-lg'>
            <table className='w-full text-sm text-left text-gray-400'>
              <thead className='text-xs uppercase bg-gray-700 text-gray-400'>
                <tr>
                  <th scope='col' className='py-3 px-6'>
                    Picture
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Filename
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Quantity
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Size
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Price
                  </th>
                  <th scope='col' className='py-3 px-6'>

                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItemsState.cartItems.map((cartItem, i) => (
                  <tr key={generateId(6)} className='border-b bg-gray-800 border-gray-700 hover:bg-gray-600'>
                    <th scope='row' className='py-4 px-6 font-medium whitespace-nowrap text-white'>
                      <span className='cursor-pointer' onClick={() => setIsPictureDrawerOpen(true)}>

                        <div className='flex flex-wrap justify-center w-full h-12'>
                          <img
                            src={cartItem.cloud_url}
                            className='block object-cover object-center w-full h-full'
                            alt='' />
                        </div>

                      </span>
                    </th>
                    <th scope='row' className='py-4 px-6 font-medium whitespace-nowrap text-white'>
                      {cartItem.filename}
                    </th>
                    <td className='py-4 px-6'>
                      <div className='flex ml-1'>
                        <button
                          className='btn-primary w-4 rounded-sm mr-1.5'
                          onClick={() => {
                            qtyOperation(i, 'decrement');
                          }}
                        >
                          -
                        </button>
                        <p>{cartItem.quantity}</p>
                        <button
                          className='btn-primary w-4 rounded-sm ml-1.5'
                          onClick={() => {
                            qtyOperation(i, 'increment');
                          }}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className='py-4 px-6'>
                      {cartItem.size}
                    </td>
                    <td className='py-4 px-6'>
                      ${calculatePrice(cartItem)}
                    </td>
                    <td className='py-4 px-6 text-center'>
                      <a href='#' className='font-medium text-blue-500 hover:underline'>Remove</a>
                    </td>
                  </tr>
                ))}
                <tr className='border-b bg-gray-800 border-gray-700 hover:bg-gray-600'>
                  <th scope='col' className='py-3 px-6'>
                  </th>
                  <th scope='col' className='py-3 px-6'>
                  </th>
                  <th scope='col' className='py-3 px-6'>
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    TOTAL
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    ${parseFloat(cartItemsState.totalAmount).toFixed(2)}
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    <div className='flex justify-end'>
                      <button className='btn-primary p-2' onClick={handleCheckout}>Make Payment</button>
                    </div>
                  </th>
                </tr>
              </tbody>
            </table>
            <PictureDrawer isOpen={isPictureDrawerOpen} setIsOpen={setIsPictureDrawerOpen}></PictureDrawer>
          </div>
        </article>
      </section>
      <section
        className=' w-screen h-full cursor-pointer '
        onClick={() => {
          setIsOpen(false);
        }}
      >
      </section>
    </main>
    </>
  );
}

export default CartDrawer;