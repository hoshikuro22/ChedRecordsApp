import  { useState, useEffect } from "react";
import axios from "axios";
import { FaEnvelope, FaUsers } from 'react-icons/fa';

export default function NormalHome() {

  // to fetch the the communicationCount
  const [communicationCount, setCommunicationCount] = useState(0);
  useEffect(() => {
    // Fetch the count of Communications from the backend
    axios.get("http://localhost:8081/getCommunicationCount")
      .then((response) => {
        setCommunicationCount(response.data.communicationCount);
      })
      .catch((error) => {
        console.error("Error fetching communication count:", error);
      });
  }, []);

    // to fetch the the clientCount
    const [clientCount, setClientCount] = useState(0);
    useEffect(() => {
      // Fetch the count of Communications from the backend
      axios.get("http://localhost:8081/getClientCount")
        .then((response) => {
          setClientCount(response.data.clientCount);
        })
        .catch((error) => {
          console.error("Error fetching client count:", error);
        });
    }, []);


  return (
    <div className="w-screen h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
       
        <a href="/normal/ncommunications" className="bg-white rounded-lg shadow-lg p-6 border border-gray-300 hover:border-indigo-600 transition-all">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <span className="text-2xl leading-loose text-indigo-600">
                <FaEnvelope />
                </span>
              </div>
              <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-600">
                  Total Communications:
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {communicationCount} Files
                </p>
              </div>
            </div>
          </a>

          <a href="normal/nchedclients" className="bg-white rounded-lg shadow-lg p-6 border border-gray-300 hover:border-green-500 transition-all">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <FaUsers size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-600">
                  Total CHED Clients
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {clientCount} Clients
                </p>
              </div>
            </div>
          </a>

          {/* Other cards can be added similarly */}

        </div>
      </div>
    </div>
  );
}
