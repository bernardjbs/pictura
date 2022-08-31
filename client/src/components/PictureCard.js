import React, { useEffect, useContext } from 'react'
import { useLazyQuery } from '@apollo/client';

import Auth from '../utils/auth';
import { Context } from '../utils/GlobalState';
import { QUERY_PICTURE } from '../utils/queries';

import DropDown from './DropDown';

export default function PictureCard({ cloud_url, user, pictureId }) {
  const [userState, setUserState] = useContext(Context)['user'];
  const [cartItemsState, setCartItemsState] = useContext(Context)['cartItems'];
  const [selectedSizeState, setSelectedSizeState] = useContext(Context)['selectedSize'];

  // const { data } = useQuery(QUERY_PICTURE, {variables: {PictureId: }});
  const [getPicture, { data }] = useLazyQuery(QUERY_PICTURE);

  useEffect(() => {
    setUserState(user)
  })

  const handleAddToCart = (pictureId) => {
    getPicture({ variables: { id: pictureId } }).then(picture => {
      const currentTotal = cartItemsState.totalAmount;
      const selectedPicture = picture.data.picture;
      const newItem = {
        customerId: Auth.getProfile().data._id,
        pictureId: pictureId,
        filename: selectedPicture.filename,
        size: selectedSizeState.printSize, 
        quantity: 1,
        cloud_url: selectedPicture.cloud_url,
        unitPrice: selectedSizeState.unitPrice
      }
      const newItemArray = [...cartItemsState.cartItems, newItem]
      const newItems = {
        cartItems: newItemArray,
        totalAmount: currentTotal + (newItem.quantity * newItem.unitPrice)
      }
      setCartItemsState(newItems);
    });
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
