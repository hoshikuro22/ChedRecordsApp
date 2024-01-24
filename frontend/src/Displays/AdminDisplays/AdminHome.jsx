import  { useState, useEffect } from "react";
import axios from "axios";
import { FaEnvelope, FaUsers } from 'react-icons/fa';
import { TEChart } from "tw-elements-react";

export default function AdminHome() {

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

    // to fetch the Status count of Communication
    const [documentStatusCounts, setDocumentStatusCounts] = useState({});
    useEffect(() => {
    axios.get("http://localhost:8081/getDocumentStatusCounts")
    .then((response) => {
      const counts = response.data.reduce((acc, curr) => {
        acc[curr.type] = curr.count;
        return acc;
      }, {});
      setDocumentStatusCounts(counts);
    })
    .catch((error) => {
      console.error("Error fetching document status counts:", error);
    });
}, []);


   // to fetch the Client Type count of Communication
const [clientTypeCounts, setClientTypeCounts] = useState({});
useEffect(() => {
  axios.get("http://localhost:8081/getClientTypeCounts")
    .then((response) => {
      const counts = response.data.reduce((acc, curr) => {
        acc[curr.type] = curr.count;
        return acc;
      }, {});
      setClientTypeCounts(counts);
    })
    .catch((error) => {
      console.error("Error fetching client type counts:", error);
    });
}, []);

  return (
    <div className="w-screen h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
       
        <a href="/admin/communications" className="bg-white rounded-lg shadow-lg p-6 border border-gray-300 hover:border-indigo-600 transition-all">
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
                <p className="text-2xl font-bold text-gray-800 mb-10">
                  {communicationCount} Files
                </p>

              </div>
              
            </div>

            <TEChart
  type="pie"
  data={{
    labels: ["Pending", "Approved", "Disapproved"],
    datasets: [
      {
        label: "Status",
        data: [
          documentStatusCounts["Pending"] || 0,
          documentStatusCounts["Approved"] || 0,
          documentStatusCounts["Disapproved"] || 0,
        ],
        backgroundColor: [
          "rgba(63, 81, 181, 0.5)",
          "rgba(77, 182, 172, 0.5)",
          "rgba(66, 133, 244, 0.5)",
        ],
      },
    ],
  }}
/>
          </a>

          <a href="/admin/chedclients" className="bg-white rounded-lg shadow-lg p-6 border border-gray-300 hover:border-green-500 transition-all items-center">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <FaUsers size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-600">
                  Total CHED Clients
                </p>
                <p className="text-2xl font-bold text-gray-800 mb-10">
                  {clientCount} Clients
                </p>
              </div>
            </div>
           
<TEChart
  type="pie"
  data={{
    labels: [
      "CHED10",
      "HEIS",
      "GOVERNMENT OFFICE",
      "AGENCY",
      "INDIVIDUAL",
    ],
    datasets: [
      {
        label: "Clients",
        data: [
          clientTypeCounts["CHED10"] || 0,
          clientTypeCounts["HEIS"] || 0,
          clientTypeCounts["GOVERNMENT OFFICE"] || 0,
          clientTypeCounts["AGENCY"] || 0,
          clientTypeCounts["INDIVIDUAL"] || 0,
        ],
        backgroundColor: [
          "rgba(63, 81, 181, 0.5)",
          "rgba(77, 182, 172, 0.5)",
          "rgba(66, 133, 244, 0.5)",
          "rgba(156, 39, 176, 0.5)",
          "rgba(233, 30, 99, 0.5)",
        ],
      },
    ],
  }}
/>
          </a>


        </div>
      </div>
    </div>
  );
}
