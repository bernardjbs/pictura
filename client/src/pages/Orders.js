import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { QUERY_ORDERS_BY_STATUS } from '../utils/queries';

import { Context } from '../utils/GlobalState';

function Orders() {
  const [getOrders, { data }] = useLazyQuery(QUERY_ORDERS_BY_STATUS);

  const [selectedStatus, setSelectedStatus] = useState('Open')
  const [selectedOrderState, setSelectedOrderState] = useContext(Context)['cartItems'];

  const handleSelectChange = () => {
      getOrders(
        {variables: {status: selectedStatus}}
      )
    if (data) {
      setSelectedOrderState(data.ordersByStatus[0])
    }
    }

  useEffect(() => {
    handleSelectChange()

  }, [selectedStatus])


  return (
    <div className='flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-2'>
      <div className='container px-5 py-2 mx-auto lg:px-32'>
        <article className=''>
          <section className='flex flex-row items-center '>
            <header className='p-4 font-bold text-lg'>Orders</header>
            <div>
              <select
                className="border  text-sm rounded-lg  block w-full p-1.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => {
                  setSelectedStatus(e.currentTarget.value)
                  handleSelectChange()
                }}
              >
                <option defaultValue>Open</option>
                <option>In Progress</option>
                <option>Ready</option>
              </select>
            </div>
          </section>
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
                      data.ordersByStatus.map(order => (
                        <tr key={''} className='border-b bg-gray-800 border-gray-700'>
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
                            {order.createdAt}
                          </td>
                          <td className='py-4 px-6 text-center'>
                            <Link to='/order' className='font-medium text-blue-500 hover:underline'>View Order</Link>
                          </td>
                        </tr>
                      ))
                    ) :
                    console.log('data in process...')
                }

                {data ? setSelectedOrderState(data.ordersByStatus[0]) : console.log('')}

              </tbody>
            </table>
          </div>
        </article>
      </div>
    </div>
    

  )
}

export default Orders
