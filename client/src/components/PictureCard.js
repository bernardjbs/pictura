import React, { useState } from 'react'
import { useMutation } from '@apollo/client';

import img_01 from '../assets/img/test_img/01.JPG';
import SizeOrder from './SizeOrder';


const AddedElement = () => <p><SizeOrder /></p>

export default function PictureCard({cloud_url}) {

  const [count, setCount] = useState(0) 
  return (
    <>
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
            <button onClick={() => setCount(count + 1)} className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Add to Cart
            </button>
            { [...Array(count)].map((_, i) => <AddedElement key={i} />) }
          </div>
        </div>
      </div>
    </>
  )
}
