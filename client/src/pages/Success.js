import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import generateId from '../utils/generateId';
import Auth from '../utils/auth';

import { ADD_ORDER } from '../utils/mutations';

function Success() {
  const [addOrder, { error }] = useMutation(ADD_ORDER);

  const saveOrder = async () => {
    let pictureOrders = [];
    const itemsOrdered = JSON.parse(window.sessionStorage.getItem('items'))

    itemsOrdered.forEach(item => {
      pictureOrders.push(
        {
          size: item.size,
          quantity: item.quantity,
          filename: item.filename,
          cloud_url: item.cloud_url,
        }
      )
    });
    const user = Auth.getProfile().data._id
    console.log(pictureOrders);
    try {
      const { data } = await addOrder({
        variables: { user: user, pictureOrders: pictureOrders, status: 'Open' }
      })
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   // Save Order to Database
  //   saveOrder();
  // }, [addOrder]);
  return (
    <div>
      <h1>PAYMENT SUCCESSFULL - THANK YOU FOR YOUR PURCHASE</h1>
      <h1>ORDER DETAILS: ...</h1>
      <button onClick={saveOrder}>Save</button>
    </div>
  )
}

export default Success
