import React from 'react'
import { MdShoppingCart } from 'react-icons/md';

import PictureCard from '../components/PictureCard';

import img_01 from '../assets/img/test_img/01.JPG';
// import img_02 from '../assets/img/test_img/img_02';
// import img_03 from '../assets/img/test_img/img_03';
// import img_04 from '../assets/img/test_img/img_04';
// import img_05 from '../assets/img/test_img/img_05';
// import img_06 from '../assets/img/test_img/img_06';
// import img_07 from '../assets/img/test_img/img_07';
// import img_08 from '../assets/img/test_img/img_08';
// import img_09 from '../assets/img/test_img/img_09';
// import img_10 from '../assets/img/test_img/img_10';

const handleUploadPictures = async (e) => {
  console.log('upload pictures')
};

export default function Pictures() {
  return (
    <>
      <section className='overflow-hidden text-gray-700 '>
        <div className='container px-5 py-2 mx-auto lg:pt-12 lg:px-32'>
          <div className='flex flex-wrap -m-1 md:-m-2'>
            <div className='flex flex-wrap w-1/3'>
              <div className='w-full p-1 md:p-2'>
                <PictureCard />
              </div>
            </div>
            <div className='flex flex-wrap w-1/3'>
              <div className='w-full p-1 md:p-2'>
                <PictureCard />
              </div>
            </div>
            <div className='flex flex-wrap w-1/3'>
              <div className='w-full p-1 md:p-2'>
                <PictureCard />
              </div>
            </div>
            <div className='flex flex-wrap w-1/3'>
              <div className='w-full p-1 md:p-2'>
                <PictureCard />
              </div>
            </div>
            <div className='flex flex-wrap w-1/3'>
              <div className='w-full p-1 md:p-2'>
                <PictureCard />
              </div>
            </div>
            <div className='flex flex-wrap w-1/3'>
              <div className='w-full p-1 md:p-2'>
                <PictureCard />
              </div>
            </div>
            <div className='flex flex-wrap w-1/3'>
              <div className='w-full p-1 md:p-2'>
                <PictureCard />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
