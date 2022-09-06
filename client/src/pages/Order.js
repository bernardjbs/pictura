import React, { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom';

import downloadOrders from '../utils/downloadOrders';

import { Context } from '../utils/GlobalState';

function Order() {
  const [selectedOrderState, setSelectedOrderState] = useContext(Context)['cartItems'];
  const [dataURLs, setDataURLs] = useState([]);

  const handleOnClick = () => {
    downloadOrders(selectedOrderState)
    console.log('downloaded and update status')
  }

  return (
    <div className='flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-2'>

      <div className='container px-5 py-2 mx-auto lg:px-32'>

        <div className='overflow-x-auto relative shadow-md sm:rounded-lg'>
          <table className='w-full text-sm text-left text-gray-400'>
            <thead className='text-xs uppercase bg-gray-700 text-gray-400'>
              <tr>
                <th scope='col' className='py-3 px-6'>
                  Order Number
                </th>
                <th scope='col' className='py-3 px-6'>
                  Customer
                </th>
                <th scope='col' className='py-3 px-6'>
                  Status
                </th>
                <th scope='col' className='py-3 px-6'>
                  Order Date
                </th>
                <th scope='col' className='py-3 px-6'>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                selectedOrderState ?
                  (

                    <tr key={''} className='border-b bg-gray-800 border-gray-700'>
                      <th scope='row' className='py-4 px-6 font-medium whitespace-nowrap text-white'>
                        <div className='flex flex-wrap w-full'>
                          {selectedOrderState.orderNumber}
                        </div>
                      </th>
                      <th scope='row' className='py-4 px-6 font-medium whitespace-nowrap text-white'>
                        {selectedOrderState.user.firstname} {selectedOrderState.user.lastname}
                      </th>
                      <td className='py-4 px-6'>
                        <div className='flex ml-1'>
                          {selectedOrderState.status}
                        </div>
                      </td>
                      <td className='py-4 px-6'>
                        {selectedOrderState.createdAt}
                      </td>
                      <td className='py-4 px-6 text-center'>
                        {selectedOrderState.status === 'Open'
                          ?
                          (<Link to='/orders' onClick={() => handleOnClick()}>Download</Link>)
                          : <></>}
                      </td>
                    </tr>

                  ) :
                  console.log('data in process...')
              }

            </tbody>
          </table>

        </div>
        <div className='flex flex-wrap -m-1 md:-m-2'>

          {selectedOrderState.pictureOrders.map(picture => (
            <div className='flex flex-wrap w-1/3 mt-4' key={picture.cloud_url}>
              <div className='w-full p-1 md:p-2'>
                <div className='bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'>
                  <div className='flex flex-wrap'>
                    <div className='w-full h-72 p-1 md:p-2'>
                      <img alt='gallery' className='block object-cover object-center w-full h-full rounded-lg'
                        src={picture.cloud_url} />
                    </div>
                  </div>
                  <div className='p-5'>
                    <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{picture.filename}</h5>
                    <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{picture.size} - QTY: {picture.quantity}</p>
                    <section className='flex items-center'>
                      <div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Order
