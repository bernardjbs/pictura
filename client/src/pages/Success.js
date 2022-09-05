import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import generateId from '../utils/generateId';
import Auth from '../utils/auth';

import greentick from '../assets/img/greentick.png'
import { ADD_ORDER } from '../utils/mutations';

function Success() {
  const [successOrder, setSuccessOrder] = useState({});
  const [addOrder, { error }] = useMutation(ADD_ORDER);
  const itemsOrdered = JSON.parse(window.sessionStorage.getItem('items'))

  let total = 0;

  const saveOrder = async () => {
    console.log(sessionStorage);
    if(sessionStorage.length == 0) {
      window.location.assign('/')
    } else {
      let pictureOrders = [];
      const orderNumber = generateId(6) + Date.now();
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
          variables: { user: user, pictureOrders: pictureOrders, status: 'Open', orderNumber: orderNumber }
        })
        setSuccessOrder(data.addOrder)
      } catch (error) {
        console.log(error)
      }
      setTimeout(() => {
        sessionStorage.clear();
      }, 100);
  
    }
  }

  const calculateTotal = () => {
    if(itemsOrdered) {
      itemsOrdered.forEach(item => {
        total = total + item.subTotal;
      });
      return total;  
    }
  }

  useEffect(() => {
    // Save Order to Database
    saveOrder();
  }, [addOrder]);
  return (

    <>
      <section className="bg-gray-900">
        <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-28">
          <div className="w-100 bg-gray-200">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

              <div className='flex flex-col items-center'>
                <h1 className='text-xl'>PAYMENT SUCCESSFULL</h1>
                <img alt='green-tick' className='w-16 m-8' src={greentick} />
                <h1 className='text-xl'>THANK YOU FOR YOUR PURCHASE</h1>
                
                <h1 className='m-4'>ORDER NUMBER: {successOrder.orderNumber}</h1>
                
                <div className='overflow-x-auto relative shadow-md sm:rounded-lg'>
                  <table className='w-full text-sm text-left text-gray-700'>
                    <thead className='text-xs uppercase bg-gray-300'>
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
                      </tr>
                    </thead>
                    <tbody>
                      {
                        itemsOrdered ?
                          itemsOrdered.map(pictureOrder => (
                            <tr key={generateId(6)} className='text-gray-700 bg-gray-300'>
                              <th scope='row' className='py-4 px-6 font-medium whitespace-nowrap'>
                                <div className='flex flex-wrap justify-center w-full h-12'>
                                  <img
                                    src={pictureOrder.cloud_url}
                                    className='block object-cover object-center w-full h-full'
                                    alt='' />
                                </div>
                              </th>
                              <th scope='row' className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap'>
                                <p>{pictureOrder.filename}</p>
                              </th>
                              <th scope='row' className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap'>
                                <p>{pictureOrder.quantity}</p>
                              </th>
                              <th scope='row' className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap'>
                                <p>{pictureOrder.size}</p>
                              </th>
                              <th scope='row' className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap'>
                                <p>${parseFloat(pictureOrder.subTotal).toFixed(2)}</p>
                              </th>

                            </tr>
                          )) :
                          console.log('array not filled yet')
                      }
                      <tr className='bg-white border-b hover:bg-gray-50 '>
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
                          ${parseFloat(calculateTotal()).toFixed(2)}
                        </th>

                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* <button onClick={saveOrder}>Save</button> */}
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Success
