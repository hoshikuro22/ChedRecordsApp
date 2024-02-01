import { useState, useEffect } from "react";
import axios from "axios";
import { BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Picture from "../assets/ched10.png";
import HomePage from "./HomePage";
import ChedBackgroundImage from "../assets/CHED10Picture.jpg";
import { makeRequest } from "../../axios";

export default function LandingPage() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    makeRequest
      .post("/login", values)
      .then((res) => {
        console.log(res);
        if (res.data.userType === 0) {
          navigate("/admin/adhome");
        } else if (res.data.userType >= 1 && res.data.userType <= 7) {
          navigate("/normal/ncommunications");
        } else {
          // alert(res.data.Error);
          alert("Password or User not matched, please try again.");
        }
      })
      .catch((err) => console.log(err));
  };

  // auth
  const [auth, setAuth] = useState(false);
  axios.defaults.withCredentials = true;
  useEffect(() => {
        makeRequest.get('/')
        
      .then((res) => {
        if (res.data.Status === "Logged in") {
          setAuth(true);
        } else {
          setAuth(false);
        }
      });
  }, []);

  return (
    <div>
      {auth ? (
        <div>
          <HomePage />
        </div>
      ) : (
        <div
          className="relative h-screen bg-cover bg-center"
          style={{
            backgroundImage: `url(${ChedBackgroundImage})`,
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Overlay with 50% opacity */}
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

          {/* content */}
          <div className="bg-sky-950 top-0 pt-2 h-5 text-center"></div>
          <div className="relative flex flex-col items-center justify-center p-9 z-10">
            <div className="mt-3">
              <div className="flex flex-col md:flex-row md:items-center text-2xl font-semibold text-white">
                <img
                  className="h-[200px] w-[200px] md:mr-6"
                  alt="ched-logo"
                  src={Picture}
                />
                <div>
                  <span className="block text-center md:text-left">
                    Commission on Higher Education Region X
                  </span>
                  <span className="block mt-7 text-5xl font-bold text-center md:text-left">
                    Records Management Information System
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative bg-black bg-opacity-40 flex items-center justify-center z-10">
            <div className="bg-white p-8 rounded shadow-lg w-80 my-2">
              <div className="items-center flex mb-4 gap-2">
                <BsFillPersonFill size="25" />
                <h1 className="text-3xl font-semibold ">User Login</h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-lg font-medium text-gray-700">
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
                  <label className="block text-lg font-medium text-gray-700">
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
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 text-lg"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
