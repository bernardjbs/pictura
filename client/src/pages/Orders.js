import React from 'react'
import { useQuery, useMutation } from '@apollo/client';
import {QUERY_ORDERS} from '../utils/queries';


function Orders() {

  const getDate = (date) => {
    return date.toLocaleDateString();
  }

  const {data} = useQuery(QUERY_ORDERS);
  if(data) {
    console.log(data.orders)
  }
  return (
    <div>
      <article className=''>
        <header className='p-4 font-bold text-lg'>Orders</header>
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
                  Items QTY
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
                data ? 
                (
                  data.orders.map(order => (
                    <tr key={''} className='border-b bg-gray-800 border-gray-700 hover:bg-gray-600'>
                      <th scope='row' className='py-4 px-6 font-medium whitespace-nowrap text-white'>
                        <div className='flex flex-wrap w-full'>
                          {order.orderNumber}
                        </div>
                      </th>
                      <th scope='row' className='py-4 px-6 font-medium whitespace-nowrap text-white'>
                        {order.user.firstname} {order.user.lastname} 
                      </th>
                      <th scope='row' className='py-4 px-6 font-medium whitespace-nowrap text-white'>
                        {order.pictureOrders.length}
                      </th>
                      <td className='py-4 px-6'>
                        <div className='flex ml-1'>
                          {order.status}
                        </div>
                      </td>
                      <td className='py-4 px-6'>
                        {/* {getDate(order.createdAt)} */}
                        {console.log(typeof order.createdAt)}
                        {order.createdAt}
                      </td>
                      <td className='py-4 px-6 text-center'>
                        <a href='#' className='font-medium text-blue-500 hover:underline'>View Order</a>
                      </td>
                    </tr>
                  ))
                ): 
                console.log('data not available')
              }
              
            </tbody>
          </table>
        </div>
      </article>
    </div>
  )
}

export default Orders
