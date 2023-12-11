import { useState } from "react";


export default function AdminHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => { 
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-sky-950 top-0 h-14 flex items-center gap-5">

      <a href="/admin/adhome" className="text-white font-medium hover:underline text-2xl ml-auto ">
       Home
      </a>
      <div>
        <button className="text-white font-medium hover:underline text-2xl mr-20" onClick={openModal}>About Us</button>
      </div>


      {isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
    <div className="bg-white mx-auto p-4 border border-gray-300 w-1/2 max-w-screen-md text-center relative">
      <span
        className="absolute top-0 right-0 p-2 cursor-pointer"
        onClick={closeModal}
      >
        &times;
      </span>
      <p className="font-bold text-2xl mb-3">About Us</p>
      <div className="space-y-2">
        <div className="flex justify-between">
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
  );
}
