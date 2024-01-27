import { useState } from "react";

export default function NormalFooter() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => { 
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <footer className=" flex bg-gray-800 text-white h-10 items-center text-center w-screen bottom-0 mt-auto">
    <div className="ml-96 flex gap-2">
    <p className="font-bold ml-96">© 2023 CHEDRMS. All rights reserved.</p>
    
    <div>
        <button className="text-white font-bold hover:underline items-center flex  " onClick={openModal}>About Us</button>
      </div>


      {isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
    <div className="bg-white mx-auto p-4 border border-gray-300 w-1/2 max-w-screen-md text-center relative">
      <button
        className="absolute top-0 right-0 p-2 cursor-pointer text-black font-bold"
        onClick={closeModal}
      >
    X
      </button>
      <p className="font-bold text-2xl mb-3 text-black">About Us</p>
      <div className="space-y-2 text-black">
        <div className="flex justify-between ">
          <div>Developer</div>
          <div className="font-semibold">College of Information Technology</div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between">
            <div>Email</div>
            <div className="font-semibold">tipsy@gmail.com</div>
            <div className="font-semibold">von@gmail.com</div>
            <div className="font-semibold">jemry@gmail.com</div>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between">
            <div>Mobile Number</div>
            <div className="font-semibold">09123</div>
            <div className="font-semibold">091234</div>
            <div className="font-semibold">0912345</div>
          </div>
        </div>
        <div className="flex justify-between">
          <div>Website</div>
          <div className="font-semibold">The website</div>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  </footer>
  )
}
