import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../utils/GlobalState';
import DropDown from './DropDown';

export default function PictureCard({ cloud_url, user, pictureId }) {
  const [userState, setUserState] = useContext(Context)['user'];
  const [cartItemsState, setCartItemsState] = useContext(Context)['cartItems'];


  useEffect(() => {
    setUserState(user)
  })

  const handleAddToCart = (pictureId) => {
    if (cartItemsState.cartItems.includes(pictureId)) {
      console.log('add toaster here');
    } else {
      const newItem = {
        pictureId: pictureId,
        size: '10x15'
      }
      const newItemArray = [...cartItemsState.cartItems, newItem]
      const newItems = {
        cartItems: newItemArray
      }
      setCartItemsState(newItems);
    }
    console.log(cartItemsState)
  };

  return (
    <>
      <div>
        <div className='bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'>
          <div className='flex flex-wrap'>
            <div className='w-full h-72 p-1 md:p-2'>
              <img alt='gallery' className='block object-cover object-center w-full h-full rounded-lg'
                src={cloud_url} />
            </div>
          </div>
          <div className='p-5'>
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>Filename</h5>
            <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Picture description</p>
            <section className='flex items-center'>
                <div> <DropDown /></div>
                <div>
                  <button onClick={() => handleAddToCart(pictureId)} className='inline-flex items-center py-2 px-3 mx-4 btn-primary'>
                    Add to Cart
                  </button>
                </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
