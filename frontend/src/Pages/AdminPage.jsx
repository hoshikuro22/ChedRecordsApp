import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import AdminSidebar from "../Components/AdminComponents/AdminSidebar"
import { Routes, Route } from "react-router-dom"
import AdminHeader from "../Components/AdminComponents/AdminHeader"
import AdminHome from "../Displays/AdminDisplays/AdminHome"
import ChedClients from "../Displays/AdminDisplays/ChedClients"
import Communications from "../Displays/AdminDisplays/Communications"
import ActivityLog from "../Displays/AdminDisplays/ActivityLog"
import Reports from "../Displays/AdminDisplays/Reports"
import ListOfPersonnels from "../Displays/AdminDisplays/ListOfPersonnels"
import AddAccount from "../Displays/AdminDisplays/AddAccount"
import AdminFooter from "../Components/AdminComponents/AdminFooter"








export default function AdminPage() {
  const [auth, setAuth] = useState(false)
  const [message, setMessage] = useState('')
 

  axios.defaults.withCredentials = true;
  
  useEffect(() => {
    axios.get('http://localhost:8081')
    
      .then(res => {
        console.log("This is the status: "+ res.data.Status)
        console.log("This is the User_ID "+ res.data.User_ID)
        if (res.data.Status === "Logged in") {
          setAuth(true);
      
        } else {
          setAuth(false);
          setMessage(res.data.Message);
        }})},[])


        const [ifAdmin, setIfAdmin] = useState(false)
        useEffect(() => {
          axios.get('http://localhost:8081')
          
            .then(res => {
              console.log("This is the user type: "+ res.data.User_type_ID)
              if (res.data.User_type_ID === 0) {
                setIfAdmin(true);
            
              } else {
                setIfAdmin(false);
              }})},[])  

  return (
    <div>
     <AdminHeader />
      {auth ?
      <div className="h-auto min-h-screen ">
        {ifAdmin ?
        <div className='flex gap-72 h-auto '>
      
          
          <AdminSidebar />
          <Routes >
            <Route path='/adhome' element={<AdminHome/>} />
            <Route path='/chedclients' element={<ChedClients />} />
            <Route path='/communications' element={<Communications />} />
            <Route path='/activitylog' element={<ActivityLog/>} />
            <Route path='/reports' element={<Reports/>} />
            <Route path='/listofpersonnel' element={<ListOfPersonnels/>} />
            <Route path='/addaccount' element={<AddAccount/>} /> 
           
          </Routes>
        </div>
        :
        <div>
          <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <div className="bg-white p-8 rounded shadow-lg text-center">
            <p className="text-lg my-3">Only admin can access here </p>
            <a href="/normal/norhome" className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 ease-in-out">Go back</a>
          </div>
        </div>
        </div>}
        </div>
        :
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <div className="bg-white p-8 rounded shadow-lg text-center">
            <h3 className="text-red-500 text-2xl font-bold mb-4">{message}</h3>
            <p className="text-lg my-3">Log in now to access</p>
            <Link to="/login" className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 ease-in-out">Login</Link>
          </div>
        </div>
      }
     <AdminFooter />
    </div>
  )
}
