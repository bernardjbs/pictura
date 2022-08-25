import React, { useState } from 'react'
import { MdShoppingCart } from 'react-icons/md';
import { useMutation } from '@apollo/client';

import PictureCard from '../components/PictureCard';
import { ADD_PICTURE } from '../utils/mutations';

import Auth from '../utils/auth';

let loggedInUser;
if (Auth.loggedIn()) {
  loggedInUser = Auth.getProfile();
}

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

function Pictures() {
  const [addPicture, { error }] = useMutation(ADD_PICTURE)

  // Declaring States
  const [pictureFiles, setPictureFiles] = useState('');


  const handlePictureFileChange = (event) => {
    setPictureFiles(event.target.files);
  };

  const handleUploadPictures = async (event) => {
    for (let i = 0; i < pictureFiles.length; i++) {
      const imageBase64 = await convertBase64(pictureFiles[i]);
      // console.log(base64Str);
      console.log(pictureFiles[i])
      const filename = pictureFiles[i].name;
      const contentType = pictureFiles[i].type;
      const userId = loggedInUser.data._id; 

      try {
        const {data} = await addPicture({
          variables: {filename, contentType, imageBase64, userId}
        })
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <section className='overflow-hidden text-gray-700 '>
        <div className='container px-5 py-2 mx-auto lg:pt-12 lg:px-32'>
          <section className='uploader-section flex mb-4 p-4 align-middle bg-slate-400'>
            <div className='flex justify-start'>
              <div className='w-96'>
                <input className='form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out 
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' type='file' id='formFile'
                  multiple onChange={(e) => handlePictureFileChange(e)} />
              </div>
            </div>
            <div className='ml-2 flex align-middle'>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => handleUploadPictures()}>Upload</button>
            </div>
          </section>


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

export default Pictures;