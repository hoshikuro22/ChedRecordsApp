import { useState, useEffect } from "react";
import axios from "axios";
import { FaEnvelope, FaUsers } from 'react-icons/fa';
import { TEChart } from "tw-elements-react";

export default function AdminHome() {



  // function of Communication chart dropdown
  const [communicationdropdownSelection, setCommunicationDropdownSelection] = useState("By Status");
  const toggleCommunicationDropdown = () => {
    if (communicationdropdownSelection === "By Status") {
        setCommunicationDropdownSelection("By Clients");
    } else if (communicationdropdownSelection === "By Clients") {
        setCommunicationDropdownSelection("By Filing Category");
    } else {
        setCommunicationDropdownSelection("By Status");
    }
};
    // function of Communication chart dropdown
    // const [clientsdropdownSelection, setClientsDropdownSelection] = useState("By Status");
    // const toggleClientsDropdown = () => {
    //   setClientsDropdownSelection(clientsdropdownSelection === "By Status" ? "By Clients" : "By Status");
    // };

  // sa COMMUNICATIONS ////////
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

  //  fetch the Client(Names) of Communication
  const [documentByClients, setDocumentByClients] = useState({});

  useEffect(() => {
 // Fetch the count of documents by client from the backend
    axios.get("http://localhost:8081/getDocumentByClients")
      .then((response) => {
        const counts = response.data.reduce((acc, curr) => {
          acc[curr.client_name] = curr.count;
          return acc;
        }, {});
        setDocumentByClients(transformToChartData(counts));
      })
      .catch((error) => {
        console.error("Error fetching document counts by client:", error);
      });
  }, []);

   //  fetch the Client(Names) of Communication
   const [documentByDocumentTypes, setDocumentByDocumentTypes] = useState({});

   useEffect(() => {
  // Fetch the count of documents by document types from the backend
     axios.get("http://localhost:8081/getDocumentByDocumentTypes")
       .then((response) => {
         const counts = response.data.reduce((acc, curr) => {
           acc[curr.Type] = curr.count;
           return acc;
         }, {});
         setDocumentByDocumentTypes(transformToChartData(counts));
       })
       .catch((error) => {
         console.error("Error fetching document counts by client:", error);
       });
   }, []);

    // sa COMMUNICATIONS ////////


    // sa CHEDClients ////////
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
    
        // //  fetch the document types of CHED Clients
        // const [clientNameCounts, setClientNameCounts] = useState({});
        // useEffect(() => {
        //    // Fetch the count of Client type counts from the backend
        //   axios.get("http://localhost:8081/getClientNameCounts")
        //     .then((response) => {
        //       const counts = response.data.reduce((acc, curr) => {
        //         acc[curr.client_name] = curr.count;
        //         return acc;
        //       }, {});
        //       setClientNameCounts(transformToChartData(counts));
        //     })
        //     .catch((error) => {
        //       console.error("Error fetching client type counts:", error);
        //     });
        // }, []);
    

    


      // sa CHEDClients ////////




   



////////
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

    // Function to calculate percentages for chart data
    const calculatePercentages = (counts) => {
      const total = Object.values(counts).reduce((acc, curr) => acc + curr, 0);
      const percentages = Object.fromEntries(
        Object.entries(counts).map(([label, count]) => [label, ((count / total) * 100).toFixed(2)])
      );
      return { percentages, total };
    };

  return (
    <div className="w-screen h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          
          <div href="/admin/communications" className="bg-white rounded-lg shadow-lg p-6 border border-gray-300 hover:border-indigo-600 transition-all">
          <div className="flex items-center space-x-4">
             <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-600">
                Total Communications:
              </p>
              <p className="text-2xl font-bold text-gray-800 mb-10 flex gap-4 mt-2">
              <span className="text-4xl leading-loose text-indigo-600">
                <FaEnvelope />
                </span>  {communicationCount} Files
              </p>
              <button className="font-bold cursor-pointer hover:bg-gray-500 bg-gray-200 w-50 p-2 border border-black rounded" onClick={toggleCommunicationDropdown}>
                {communicationdropdownSelection}: 
              </button>
            </div>
          </div>
            
          {communicationdropdownSelection === "By Clients" ? (
            <TEChart
              type="pie"
              data={documentByClients}
              options={{
                tooltips: {
                  callbacks: {
                    label: (tooltipItem, data) => {
                      const label = data.labels[tooltipItem.index];
                      const count = data.datasets[0].data[tooltipItem.index];
                      const { percentages } = calculatePercentages(documentByClients);
                      const percentage = percentages[label];
                      return `${label}: ${count} Files (${percentage}%)`;
                    },
                  },
                },
              }}
            />
          ) : communicationdropdownSelection === "By Filing Category" ? (
            <TEChart
              type="pie"
              data={documentByDocumentTypes}
              options={{
                tooltips: {
                  callbacks: {
                    label: (tooltipItem, data) => {
                      const label = data.labels[tooltipItem.index];
                      const count = data.datasets[0].data[tooltipItem.index];
                      const { percentages } = calculatePercentages(documentByDocumentTypes);
                      const percentage = percentages[label];
                      return `${label}: ${count} Files (${percentage}%)`;
                    },
                  },
                },
              }}
            />
          ) : (
            <TEChart
              type="pie"
              data={documentStatusCounts}
              options={{
                tooltips: {
                  callbacks: {
                    label: (tooltipItem, data) => {
                      const label = data.labels[tooltipItem.index];
                      const count = data.datasets[0].data[tooltipItem.index];
                      const { percentages } = calculatePercentages(documentStatusCounts);
                      const percentage = percentages[label];
                      return `${label}: ${count} Files (${percentage}%)`;
                    },
                  },
                },
              }}
            />
          )}

          </div>

 

          

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

          {/* <div href="/admin/chedclients" className="bg-white rounded-lg shadow-lg p-6 border border-gray-300 hover:border-green-500 transition-all">
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
              type="bar"
              // types are : bar, line, doughnut, pie, polarArea, radar
              data={clientNameCounts}
            />
          </div> */}


        </div>
      </div>
    </div>
  );
}
