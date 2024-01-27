import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import NormalSidebar from "../Components/NormalComponents/NormalSidebar"
import { Routes, Route } from "react-router-dom"
import NormalChedClients from "../Displays/NormalDisplays/NormalChedClients"
import NormalCommunications from "../Displays/NormalDisplays/NormalCommunications"
import NormalHeader from "../Components/NormalComponents/NormalHeader"
import NormalHome from "../Displays/NormalDisplays/NormalHome"
import NormalFooter from "../Components/NormalComponents/NormalFooter"






export default function NormalPage() {
  const [auth, setAuth] = useState(false)
  const [message, setMessage] = useState('')

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:8081')
      .then(res => {
        console.log("This is the status: "+ res.data.Status)
        console.log("This is the user type: "+ res.data.User_type_ID)
        if (res.data.Status === "Logged in") {
          setAuth(true);
        } else {
          setAuth(false);
          setMessage(res.data.Message);
        }
      })
  }, [])

  return (
    
    <div>
     <NormalHeader />
      {auth ?
         <div className="h-auto min-h-screen ">
          <div className='flex gap-72 h-auto '>
          {/* call sidebar when /normal only */}
          <NormalSidebar />     
          {/* Displays */}
          <Routes >
            <Route path='/norhome' element={<NormalHome />} />
            <Route path='/nchedclients' element={<NormalChedClients />} />
            <Route path='/ncommunications' element={<NormalCommunications />} />
            {/* <Route path='/listofpersonnel' element={<ListOfPersonnel/>} />
            <Route path='/nreports' element={<NormalReports/>} /> */}
          </Routes>
          </div>
        </div>
        :
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <div className="bg-white p-8 rounded shadow-lg text-center">
            <h3 className="text-red-500 text-2xl font-bold mb-4">{message}</h3>
            <p className="text-lg my-3">Log in now to access</p>
            <Link to="/" className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 ease-in-out">Login</Link>
          </div>
        </div>
      }
      <NormalFooter />
    </div>
  )
}
