import React, { useState } from "react";
import PictureDrawer from './PictureDrawer';

export default function CartDrawer({ isOpen, setIsOpen }) {
  const [isPictureDrawerOpen, setIsPictureDrawerOpen] = useState(false);
  return (
    <main
      className={
        " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : " transition-all delay-500 opacity-0 translate-x-full  ")
      }
    >
      <section
        className={
          "top-0 right-0 fixed w-[40vw] px-8 bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="">
          <header className="p-4 font-bold text-lg">My Cart</header>
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Picture
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Filename
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Quantity
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Size
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Price
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <span className='cursor-pointer' onClick={() => setIsPictureDrawerOpen(true)}>Image 01</span>
                  </th>
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Filename01.jpg
                  </th>
                  <td className="py-4 px-6">
                    2
                  </td>
                  <td className="py-4 px-6">
                    10x15
                  </td>
                  <td className="py-4 px-6">
                    $2.00
                  </td>
                  <td className="py-4 px-6 text-right">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Remove</a>
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <span className='cursor-pointer' onClick={() => setIsPictureDrawerOpen(true)}>Image 02</span>
                  </th>
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Filename02.jpg
                  </th>
                  <td className="py-4 px-6">
                    10
                  </td>
                  <td className="py-4 px-6">
                    15x20
                  </td>
                  <td className="py-4 px-6">
                    $25.00
                  </td>
                  <td className="py-4 px-6 text-right">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Remove</a>
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <span className='cursor-pointer' onClick={() => setIsPictureDrawerOpen(true)}>Image 03</span>
                  </th>
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Filename03.jpg
                  </th>
                  <td className="py-4 px-6">
                    5
                  </td>
                  <td className="py-4 px-6">
                    10x15
                  </td>
                  <td className="py-4 px-6">
                    $5.00
                  </td>
                  <td className="py-4 px-6 text-right">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Remove</a>
                  </td>
                </tr>
              </tbody>
            </table>
            <PictureDrawer isOpen={isPictureDrawerOpen} setIsOpen={setIsPictureDrawerOpen}></PictureDrawer>
          </div>
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      >
      </section>
    </main>
  );
}