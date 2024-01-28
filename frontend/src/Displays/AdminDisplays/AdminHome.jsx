import { useState, useEffect } from "react";
import axios from "axios";
import { FaEnvelope, FaUsers } from 'react-icons/fa';
import { TEChart } from "tw-elements-react";

export default function AdminHome() {
  const [communicationCount, setCommunicationCount] = useState(0);
  useEffect(() => {
      // Fetch the count of Communication counts from the backend
    axios.get("http://localhost:8081/getCommunicationCount")
      .then((response) => {
        setCommunicationCount(response.data.communicationCount);
      })
      .catch((error) => {
        console.error("Error fetching communication count:", error);
      });
  }, []);

  const [clientCount, setClientCount] = useState(0);
  useEffect(() => {
        // Fetch the count of Client counts from the backend
    axios.get("http://localhost:8081/getClientCount")
      .then((response) => {
        setClientCount(response.data.clientCount);
      })
      .catch((error) => {
        console.error("Error fetching client count:", error);
      });
  }, []);

  const [documentStatusCounts, setDocumentStatusCounts] = useState({});
  useEffect(() => {
     // Fetch the count of Document Status counts from the backend
    axios.get("http://localhost:8081/getDocumentStatusCounts")
      .then((response) => {
        const counts = response.data.reduce((acc, curr) => {
          acc[curr.type] = curr.count;
          return acc;
        }, {});
        setDocumentStatusCounts(transformToChartData(counts));
      })
      .catch((error) => {
        console.error("Error fetching document status counts:", error);
      });
  }, []);

  const [clientTypeCounts, setClientTypeCounts] = useState({});
  useEffect(() => {
     // Fetch the count of Client type counts from the backend
    axios.get("http://localhost:8081/getClientTypeCounts")
      .then((response) => {
        const counts = response.data.reduce((acc, curr) => {
          acc[curr.type] = curr.count;
          return acc;
        }, {});
        setClientTypeCounts(transformToChartData(counts));
      })
      .catch((error) => {
        console.error("Error fetching client type counts:", error);
      });
  }, []);

  // Function to transform status counts into chart data
  const transformToChartData = (counts) => {
    const labels = Object.keys(counts);
    const data = labels.map(label => counts[label]);
    const backgroundColor = labels.map(() => generateRandomColor());
    return { labels, datasets: [{ label: 'Status', data, backgroundColor }] };
  };

  // Function to generate random colors
  const generateRandomColor = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.5)`;
  };

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
                <p className="font-semibold">Status: </p>
              </div>
              
            </div>
            <TEChart
              type="pie"
              data={documentStatusCounts}
            />
          </a>

          <a href="/admin/chedclients" className="bg-white rounded-lg shadow-lg p-6 border border-gray-300 hover:border-green-500 transition-all">
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
                <p className="font-semibold">Client Types: </p>
              </div>
            </div>
            <TEChart
              type="pie"
              data={clientTypeCounts}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
