import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../utils/GlobalState';

import SizeOrder from './SizeOrder';

const AddedElement = () => <p><SizeOrder /></p>

export default function PictureCard({ cloud_url, user, pictureId }) {
  // const  {userContext}= useContext(Context);
  const [userState, setUserState] = useContext(Context)['user'];
  const [cartItemsState, setCartItemsState] = useContext(Context)['cartItems'];

  useEffect(() => {
    setUserState(user)
  })

  const handleAddToCart = (pictureId) => {
    if (cartItemsState.cartItems.includes(pictureId)) {
      console.log('add toaster here');
    } else {
      const newItemArray = [...cartItemsState.cartItems, pictureId]
      const newItems = {
        cartItems: newItemArray
      }
      setCartItemsState(newItems);
    }
    // console.log(cartItemsState)
  };

  return (
    <>
      {/* <h1>The state for cart: {updateCartCount()}</h1> */}
      <div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className='flex flex-wrap'>
            <div className='w-full h-72 p-1 md:p-2'>
              <img alt='gallery' className='block object-cover object-center w-full h-full rounded-lg'
                src={cloud_url} />
            </div>
          </div>
          <a href="#">
            <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Filename</h5>
            </a>

            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Picture description</p>
            <button onClick={() => handleAddToCart(pictureId)} className="inline-flex items-center py-2 px-3 btn-primary">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

    </>
  )
}
