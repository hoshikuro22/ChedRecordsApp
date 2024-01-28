import { useState, useEffect } from "react";
import axios from "axios";
import { BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Picture from "../assets/ched10.png";
import HomePage from "./HomePage";
export default function LandingPage() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/login", values)
      .then((res) => {
        console.log(res);
        if (res.data.userType === 0) {
          navigate("/admin/adhome");
        } else if (res.data.userType === 1) {
          navigate("/normal/norhome");
        } else {
          // alert(res.data.Error);
          alert("Password or User not matched, please try again.")
        }
      })
      .catch((err) => console.log(err)); };

// auth
      const [auth, setAuth] = useState(false)
      axios.defaults.withCredentials = true;
      useEffect(() => {
        axios.get('http://localhost:8081')
        
          .then(res => {
           
            if (res.data.Status === "Logged in") {
              setAuth(true);
          
            } else {
              setAuth(false);
           
            }
          })  
      }, [])

  return (
    <div>
      {auth ?
  <div>
    <HomePage/>
  </div>
    :
    <div className="bg-gray-500 h-screen">
    <div className="bg-sky-950 top-0 pt-2 h-5 text-center"></div>
    <div className="flex flex-col items-center justify-center p-9">
      <div className="mt-3">
        <div className="flex flex-col md:flex-row md:gap-6 items-center text-2xl font-semibold text-white text-center">
          <img
            className="h-[200px] w-[200px]"
            alt="ched-logo"
            src={Picture}
          />
          <span>Commission on Higher Education Region X</span>
        </div>
        <div className="mt-7 text-5xl text-white font-bold text-center">
          <span>Records Management Information System</span>
        </div>
      </div>
    </div>

    <div className="bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg w-80 my-10">
        <div className="items-center flex mb-4 gap-2">
          <BsFillPersonFill size="25" />
          <h1 className="text-2xl font-semibold ">User Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              onChange={(e) =>
                setValues({ ...values, Username: e.target.value })
              }
              required
              type="Username"
              id="Username"
              name="Username"
              className="mt-1 px-3 py-2 w-full border rounded-md focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              onChange={(e) =>
                setValues({ ...values, Password: e.target.value })
              }
              required
              type="Password"
              id="Password"
              name="Password"
              className="mt-1 px-3 py-2 w-full border rounded-md focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
              }
    </div>
  );
}
