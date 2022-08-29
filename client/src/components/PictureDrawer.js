import React from "react";

export default function Drawer({ isOpen, setIsOpen }) {
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
          "top-0 right-0 fixed w-[35vw] px-8 bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="">
          <header className="p-4 font-bold text-lg">PICTURE DRAWER</header>
          <div
            className='modalContainer'
          >
            THIS IS THE PICTURE PictureModal
            THIS IS THE PICTURE PictureModal
            THIS IS THE PICTURE PictureModal
            THIS IS THE PICTURE PictureModal
            THIS IS THE PICTURE PictureModal
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