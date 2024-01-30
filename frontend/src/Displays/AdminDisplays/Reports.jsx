import { useState, useEffect } from "react";
import axios from "axios";
import { FaEnvelope } from 'react-icons/fa';
import { RiGroupLine } from "react-icons/ri";
import { TEChart } from "tw-elements-react";

export default function Reports() {

 // fetch how many Communications
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

  // fetch how many Unit
  const [unitCount, setUnitCount] = useState(0);
  useEffect(() => {
      // Fetch the count of Communication counts from the backend
    axios.get("http://localhost:8081/getUnitCount")
      .then((response) => {
        setUnitCount(response.data.unitCount);
      })
      .catch((error) => {
        console.error("Error fetching communication count:", error);
      });
  }, []);

 //  fetch the statuses of document/communciation
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

  //  fetch the statuses of document/communciation
  const [documentUnitCounts, setDocumentUnitCounts] = useState({});
  useEffect(() => {
     // Fetch the count of Document Status counts from the backend
    axios.get("http://localhost:8081/getDocumentUnitCounts")
      .then((response) => {
        const counts = response.data.reduce((acc, curr) => {
          acc[curr.type] = curr.count;
          return acc;
        }, {});
        setDocumentUnitCounts(transformToChartData(counts));
      })
      .catch((error) => {
        console.error("Error fetching document unit counts:", error);
      });
  }, []);

////////////////////

  // Function to transform status counts into chart data
  const transformToChartData = (counts) => {
    const labels = Object.keys(counts);
    const data = labels.map(label => counts[label]);
    const backgroundColor = labels.map(() => generateRandomColor());
    return { labels, datasets: [{ label: 'Communication per Unit', data, backgroundColor }] };
  };

  

  // Function to generate random colors
  const generateRandomColor = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.5)`;
  };
  return (
    <div className="container mx-auto p-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-auto h-auto">
      <div className="md:col-span-1">
        <div className="p-4 border rounded">
          {/* Table 1 */}
          Table 1
        </div>
      </div>
      <div className="md:col-span-1">
        <div className="p-4 border rounded items-center mr-auto flex ml-96">
          {/* Chart 1 */}
          
          <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-300 hover:border-indigo-500 transition-all">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-600">Total Communications</p>
                <div className="flex items-center gap-4 mt-2 mb-4">
                  <span className="text-4xl leading-loose text-indigo-500">
                    <FaEnvelope />
                  </span>
                  <p className="text-2xl font-bold text-indigo-500">{communicationCount} Communications</p>
                </div>
                {/* <p className="font-bold w-28 p-2 rounded bg-gray-100 text-gray-800">Client Types:</p> */}
              </div>
            </div>
            <TEChart type="doughnut" data={documentStatusCounts} />
          </div>

        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <div className="md:col-span-1">
        <div className="p-4 border rounded">
          {/* Table 2 */}
          Table 2
        </div>
      </div>
      <div className="md:col-span-1">
        <div className="p-4 border rounded">
          {/* Table 3 */}
          Table 3
        </div>
      </div>
      <div className="md:col-span-1">
        <div className="p-4 border rounded">
          {/* Chart 2 */}

  
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-300 hover:border-indigo-500 transition-all">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-600">Communication Units</p>
                <div className="flex items-center gap-4 mt-2 mb-4">
                  <span className="text-4xl leading-loose text-indigo-500">
                  <RiGroupLine />
                  </span>
                  <p className="text-2xl font-bold text-indigo-500">{unitCount} Units </p>
                </div>
                {/* <p className="font-bold w-28 p-2 rounded bg-gray-100 text-gray-800">-</p> */}
              </div>
            </div>
            <div className="overflow-auto max-w-[400px] max-h-[200]">
            <TEChart type="bar" data={documentUnitCounts} />
          </div>
          </div>

        </div>
      </div>
    </div>
  </div>

  
  );
}
