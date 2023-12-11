import Picture from '../AdminComponents/ched10.png';
import { BsFillPersonFill } from 'react-icons/bs';
import { GoOrganization } from 'react-icons/go';
import { BiMessageSquare, BiSolidReport, BiLogOut } from 'react-icons/bi';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function NormalSidebar() {
  const [lastName, setlastName] = useState('');
  const [firstName, setfirstName] = useState('');

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8081').then((res) => {
      if (res.data.Status === 'Logged in') {
        setlastName(res.data.Last_Name);
        setfirstName(res.data.First_Name);
      }
    });
  }, []);

  const handleLogout = () => {
    axios.get('http://localhost:8081/logout').then((res) => {
      if (res.data.Status === 'Success') {
        location.reload(true);
      } else {
        alert('error');
      }
    }).catch((err) => console.log(err));
  };

  return (
    <div>
      <body className=" bg-slate-800 bottom-0 fixed h-screen sm:w-72">
        <div className=" bg-slate-800 text-white w-36 sm:w-72 py-4 px-6">
          <div className="flex gap-5">
            <img className=" h-16 pl-6 sm:pl-3" src={Picture} alt="Ched Logo" />
            <h1 className=" font-bold sm:text-1xl text-white top-7 items-center hidden sm:flex">
              CHED Region 10
            </h1>
          </div>

          <div className="flex items-center gap-2 mt-5">
            <BsFillPersonFill size="20" />
            <h1 className="text-1xl">Staff Name:  {lastName + ", "+firstName }</h1>
          </div>

          <div className="flex items-center mt-5">
            <ul>
              <div className="text-center block items-center mb-2">
                <li>
                  <a href="/normal/nchedclients" className="py-1 px-2 rounded hover:bg-gray-700 flex gap-3 items-center">
                    <GoOrganization />Ched Clients
                  </a>
                </li>
              </div>
              <div className="text-center block items-center mb-2">
                <li>
                  <a href="/normal/ncommunications" className="py-1 px-2 rounded hover:bg-gray-700 flex gap-3 items-center">
                    <BiMessageSquare />Communication
                  </a>
                </li>
              </div>
              <div className="text-center block items-center mb-2">
                <li>
                  <a href="/normal/nreports" className="py-1 px-2 rounded hover:bg-gray-700 flex gap-3 items-center">
                    <BiSolidReport />Reports
                  </a>
                </li>
              </div>
            </ul>
          </div>

          <div className="bottom-5 absolute">
            <Link to="/" onClick={handleLogout} className="px-2 rounded hover:bg-gray-700 flex gap-2 items-center">
              <BiLogOut />Logout (back to login)
            </Link>
          </div>
        </div>
      </body>
    </div>
  );
}
