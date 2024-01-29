import { useState, useEffect } from "react";
import axios from "axios";
import { FaUsers } from 'react-icons/fa';
import { TEChart } from "tw-elements-react";

export default function Reports() {

 // fetch how many CHEDClients
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

    //  fetch the document types of CHED Clients
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

////////////////////
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
    <div className="h-screen w-screen flex">
      <div className="w-1/4 border-2 border-slate-800 justify-center ">
        <div>
          <header className="font-semibold text-2xl m-2 items-center"> Communication Reports :</header>
              </div>

      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div href="/admin/chedclients" className="bg-white rounded-lg shadow-lg p-6 border border-gray-300 hover:border-green-500 transition-all">
          <div className="flex items-center space-x-4">
         <div className="flex-1 min-w-0">
           <p className="text-sm font-semibold text-gray-600">
             Total CHED Clients
           </p>
           <p className="text-2xl font-bold text-gray-800 mb-10 flex gap-4 mt-2">
              <span className="text-4xl leading-loose text-green-500">
               <FaUsers />
              </span> {clientCount} Clients
            </p>
           <p className="font-bold w-28 p-2  rounded">Client Types: </p>
          </div>
        </div>
            <TEChart
              type="pie"
              data={clientTypeCounts}
            />
          </div>
          </div>
    </div>
  );
}
