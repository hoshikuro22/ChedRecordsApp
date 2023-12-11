import axios from "axios";
import { useEffect, useState } from "react";
import LandingPage from "./LandingPage";
import NormalPage from "./NormalPage";
import AdminPage from "./AdminPage";

export default function HomePage() {

    const [auth, setAuth] = useState(false)
    const [kungAdmin, setKungAdmin] = useState(false)
    axios.defaults.withCredentials = true;

    useEffect(() => {
      axios.get('http://localhost:8081')
      
        .then(res => {
          console.log("This is the status: "+ res.data.Status)
          if (res.data.Status === "Logged in") {
            setAuth(true);
        
          } else {
            setAuth(false);
          }})},[])

          
    useEffect(() => {
      axios.get('http://localhost:8081')
      
        .then(res => {
          console.log("This is the user type: "+ res.data.User_type_ID)
          if (res.data.User_type_ID === 0) {
            setKungAdmin(true);
        
          } else {
            setKungAdmin(false);
          }})},[])


  return (
    <div>
   {auth ?
    <div>
 {kungAdmin ?
 <div>
    <AdminPage />
 </div>
 :
 <div>
    <NormalPage />
 </div>
 }
  </div>
  :
<div>
  <LandingPage />
</div>
}
  </div>
  )
}
