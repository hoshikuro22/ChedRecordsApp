import Picture from '../AdminComponents/ched10.png';
import { BsFillPersonFill, BsPersonVcard } from 'react-icons/bs';
import { IoMdPersonAdd, IoIosFolder } from 'react-icons/io';
import { GoOrganization } from 'react-icons/go';
import { FaClockRotateLeft } from "react-icons/fa6";
import { BiMessageSquare, BiSolidReport, BiLogOut } from 'react-icons/bi';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function AdminSidebar() {
  const [LastName, setLastName] = useState('');
  const [FirstName, setFirstName] = useState('');


  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8081')
    
    .then(res => {
      if (res.data.Status === "Logged in") {
        setLastName(res.data.Last_Name); 
        setFirstName(res.data.First_Name); 
      }
    });
  }, []);   
  // para mabutang ang name na gikan sa database

  const handleLogout = () => {
    axios.get('http://localhost:8081/logout').then((res) => {
      if (res.data.Status === "Success") {
        location.reload(true);
      } else {
        alert('error');
      }
    }).catch((err) => console.log(err));
  };

  return (
    <div>
      <div className=" bg-slate-800 bottom-0 fixed h-screen w-72">
        <div className=" bg-slate-800 text-white w-72 py-4 px-6">
          <div className="flex gap-5">
            <img className=" h-16 pl-6 sm:pl-3 mt-6" src={Picture} alt="Ched Logo" />
            <h1 className=" font-bold sm:text-1xl text-white top-7 items-center hidden sm:flex">
              CHED Region 10
            </h1>
          </div>

          <div className="flex items-center gap-2 mt-5">
            <BsFillPersonFill size="20" />
            <h1 className="text-1xl">Name: {FirstName + ", "+ LastName }</h1>
          </div>

          <div className="flex items-center mt-5">
            <ul>
            <div className="text-center block items-center mb-5">
                <li>
                  <a href="/admin/communications" className="py-1 px-2 rounded hover:bg-gray-700 flex gap-3 items-center">
                    <BiMessageSquare />Communication
                  </a>
                </li>
              </div>
              <div className="text-center block items-center mb-2">
                <li>
                  <a href="/admin/chedclients" className="py-1 px-2 rounded hover:bg-gray-700 flex gap-3 items-center">
                    <GoOrganization />Ched Clients
                  </a>
                </li>
              </div>

              <div className="text-center block items-center mb-2">
                <li>
                  <a href="/admin/documenttypes" className="py-1 px-2 rounded hover:bg-gray-700 flex gap-3 items-center">
                    <IoIosFolder />Document Types
                  </a>
                </li>
              </div>
              <div className="text-center block items-center mb-2">
                <li>
                  <a href="/admin/listofpersonnel" className="py-1 px-2 rounded hover:bg-gray-700 flex gap-3 items-center">
                    <BsPersonVcard />List of Personnel
                  </a>
                </li>
              </div>
              <div className="text-center block items-center mb-2">
                <li>
                  <a href="/admin/reports" className="py-1 px-2 rounded hover:bg-gray-700 flex gap-3 items-center">
                    <BiSolidReport />Reports
                  </a>
                </li>
              </div>
            </ul>
          </div>

        

          
          
          
          <div className='bottom-5 absolute'>
          <div className="mb-4">
            <a href="/admin/activitylog" className="px-2 rounded hover:bg-gray-700 flex gap-2 items-center">
            <FaClockRotateLeft  />Activity Log
            </a>
          </div>
          <div className="mb-4">
            <a href="/admin/addaccount" className="px-2 rounded hover:bg-gray-700 flex gap-2 items-center">
            <IoMdPersonAdd />Accounts
            </a>
          </div>
          <div className="">
            <Link to="/login" onClick={handleLogout} className="px-2 rounded hover:bg-gray-700 flex gap-2 items-center">
              <BiLogOut />Logout (back to login)
            </Link>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
