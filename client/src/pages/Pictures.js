import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import PictureCard from '../components/PictureCard';
import CartDrawer from '../components/CartDrawer';

import { ADD_PICTURE } from '../utils/mutations';
import { QUERY_USER } from '../utils/queries';
import { Context } from '../utils/GlobalState';

function Pictures() {
  const [isOpen, setIsOpen] = useState(false);
  const [addPicture, { error }] = useMutation(ADD_PICTURE)
  const [pictureFiles, setPictureFiles] = useState('');
  const { data, refetch, loading } = useQuery(QUERY_USER);
  const [cartItemsState, setCartItemsState] = useContext(Context)['cartItems'];

  let user;
  if (data) {
    user = data.user;
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

  const handlePictureFileChange = (event) => {
    setPictureFiles(event.target.files);
  };

  const handleUploadPictures = async (event) => {
    for (let i = 0; i < pictureFiles.length; i++) {
      const imageBase64 = await convertBase64(pictureFiles[i]);
      try {
        const { data } = await addPicture({
          variables: {
            imageBase64: imageBase64,
            filename: pictureFiles[i].name,
            contentType: pictureFiles[i].type,
          }
        })
      } catch (error) {
        console.error(error);
      };
    };
    refetch();
  };

  return (
    <>
      <div className="flex flex-col px-6 py-8 mx-auto md:h-screen">
        <section className='overflow-hidden text-gray-700 mb-48'>
          {user ? (
            <>
              <section className='overflow-hidden text-gray-700 '>
                <div className='container px-5 py-2 mx-auto lg:pt-12 lg:px-32'>
                  <section className='uploader-section flex mb-4 p-4 align-middle bg-slate-400 justify-between'>
                    <section className='pictures-uploader flex'>
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
                        <button className='btn-primary py-2 px-4 rounded' onClick={() => handleUploadPictures()}>Upload</button>
                      </div>
                    </section>




                    <button type='button' className='inline-flex items-center px-5 py-2.5 btn-primary' onClick={() => setIsOpen(true)}>
                      My Cart
                      <span className='inline-flex justify-center items-center ml-2 w-4 h-4 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full'>
                        {cartItemsState.cartItems.length}
                      </span>
                    </button>

                  </section>

                  <div className='flex flex-wrap -m-1 md:-m-2'>
                    {user.pictures.map(picture => (
                      <div className='flex flex-wrap w-1/3' key={picture._id}>
                        <div className='w-full p-1 md:p-2'>
                          <PictureCard cloud_url={picture.cloud_url} user={user} pictureId={picture._id} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </>
          ) :
            <p>Loading...</p>}
        </section>
        <CartDrawer isOpen={isOpen} setIsOpen={setIsOpen} headerTitle='My Cart'>
        </CartDrawer>
      </div>

    </>
  )
}

export default Pictures;