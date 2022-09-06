import React, { useState, useEffect, useContext } from 'react'
import { useLazyQuery } from '@apollo/client';

import Auth from '../utils/auth';
import { Context } from '../utils/GlobalState';
import { QUERY_PICTURE } from '../utils/queries';

import DropDownSizes from './DropDownSizes';

export default function PictureCard({ cloud_url, user, pictureId }) {
  const [userState, setUserState] = useContext(Context)['user'];
  const [cartItemsState, setCartItemsState] = useContext(Context)['cartItems'];
  const [selectedSizeState, setSelectedSizeState] = useContext(Context)['selectedSize'];

  // const { data } = useQuery(QUERY_PICTURE, {variables: {PictureId: }});
  const [getPicture, { data }] = useLazyQuery(QUERY_PICTURE);

  const [errors, setErrors] = useState({});
  const [allowClick, setAllowClick] = useState(false);

  useEffect(() => {
    setUserState(user)
  })

  useEffect(() => {
    if (Object.keys(errors).length === 0 && allowClick) {
    }
  }, [errors])

  const validation = () => {
    const validateErrors = {}
    if (selectedSizeState.printSize === 'Choose a size' || selectedSizeState.printSize === undefined) {
      validateErrors.chooseSize = 'Please choose a size'
    }
    return validateErrors;
  }

  const handleAddToCart = (pictureId) => {

    setErrors(validation());
    if (selectedSizeState.printSize === '')
      setErrors({ chooseSize: 'Please choose a size' })

    setAllowClick(true);
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
      let addToCart = false;
      if (newItem.unitPrice > 0) {
        addToCart = true
      }
      const newItems = {
        cartItems: newItemArray,
        totalAmount: currentTotal + (newItem.quantity * newItem.unitPrice),
        addToCart: addToCart
      }

      return newItems
    }).then(newItems => {
      console.log(newItems)
      if (newItems.addToCart) {
        setCartItemsState(newItems);
      } else {
        console.log('do not add to cart')
      }
      setSelectedSizeState({})
    });
  };

  return (
    <>
      {/* <pre>{JSON.stringify(selectedSizeState, undefined, 2)}</pre> */}
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
              <div> <DropDownSizes /></div>
              <div>
                <button onClick={() => handleAddToCart(pictureId)} className='inline-flex items-center py-2 px-3 mx-4 btn-primary'>
                  Add to Cart
                </button>
              </div>
            </section>
            <p className='text-red-500 font-bold mt-4'>{errors.chooseSize}</p>
          </div>
        </div>
      </div>
    </>
  )
}
