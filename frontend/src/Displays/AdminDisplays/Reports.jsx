import { useState, useEffect } from "react";

import { FaEnvelope } from 'react-icons/fa';
import { RiGroupLine } from "react-icons/ri";
import { TEChart } from "tw-elements-react";
import { makeRequest } from "../../../axios";

export default function Reports() {
//==============FETCHING BELOW===============//

   // to fetch units 
   const [unitOptions, setUnitOptions] = useState([]);
  useEffect(() => {
  const fetchUnitData = async () => {
    try {
      const response = await makeRequest.get("/getUnits");
      setUnitOptions(response.data);
      console.log("the units " + JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching units data:", error);
    }
  }; fetchUnitData(); }, []);


  // to fetch document type 
const [documentTypeOptions, setDocumentTypeOptions] = useState([]);
useEffect(() => {
  const fetchDocumentTypeData = async () => {
    try {
      const response = await makeRequest.get("/getDocumentTypes");
      setDocumentTypeOptions(response.data);
      console.log("Document types: " + JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching document type data:", error);
    }
  };
   fetchDocumentTypeData();}, []);


     // to fetch status
const [statusOptions, setStatusOptions] = useState([]);
useEffect(() => {
  const fetchStatusData = async () => {
    try {
      const response = await makeRequest.get("/getStatus");
      setStatusOptions(response.data);
      console.log("Status " + JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching status data:", error);
    }
  };
  fetchStatusData();}, []);


//     // to fetch personnel
//   const [personnelOptions, setPersonnelOptions] = useState([]);
// useEffect(() => {
//   const fetchPersonnelData = async () => {
//     try {
//       const response = await makeRequest.get("/getPersonnels");
//       setPersonnelOptions(response.data);
//       console.log("Status " + JSON.stringify(response.data));
//     } catch (error) {
//       console.error("Error fetching status data:", error);
//     }
//   };
//   fetchPersonnelData();}, []);

//==============FETCHING ABOVE===============//

  const [documents, setDocuments] = useState([]);
  const [filterYearReceived, setFilterYearReceived] = useState(new Date().getFullYear());
  const [filterMonthReceived, setFilterMonthReceived] = useState(new Date().getMonth() + 1); // Months are 0-indexed in JS
  const [startDateReceived, setStartDateReceived] = useState("");
  const [endDateReceived, setEndDateReceived] = useState("");
  const [filterUnit, setFilterUnit] = useState("");
  const [filterDocumentType, setFilterDocumentType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  // const [filterPersonnel, setFilterPersonnel] = useState("");
  
  useEffect(() => {
    makeRequest.get("/getDocuments")
      .then((response) => {
        setDocuments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
      });
  }, []);


  const filteredDocuments = documents.filter((doc) => {
    const dateReceived = new Date(doc.date_received);
    const year = dateReceived.getFullYear();
    const month = dateReceived.getMonth() + 1; // Adjusting because getMonth() is 0-indexed
    return (
      (!filterYearReceived || year === filterYearReceived) &&
      (!filterMonthReceived || month === filterMonthReceived) &&
      (!startDateReceived || new Date(doc.date_received) >= new Date(startDateReceived)) &&
      (!endDateReceived || new Date(doc.date_received) <= new Date(endDateReceived)) &&
      (!filterUnit || doc.unit === filterUnit) &&
      (!filterDocumentType || doc.document_type === filterDocumentType) &&
      (!filterStatus || doc.status === filterStatus) 
      // (!filterPersonnel || doc.list_personnel === filterPersonnel)
    );
  });


 // fetch how many Communications
 const [communicationCount, setCommunicationCount] = useState(0);
 useEffect(() => {
     // Fetch the count of Communication counts from the backend
   makeRequest.get("/getCommunicationCount")
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
    makeRequest.get("/getUnitCount")
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
   makeRequest.get("/getDocumentStatusCounts")
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
    makeRequest.get("/getDocumentUnitCounts")
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
    return { labels, datasets: [{ label: 'Records per Unit', data, backgroundColor }] };
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
      <div className="grid grid-cols-4 gap-4">
        
        {/* TABLE 1 - Occupying 3/4th of the space */}
        <div className="col-span-3 bg-gray-100 overflow-auto">
          <div className="p-4 bg-white shadow rounded-lg">
            {/* Filter selection and Table */}
            <div className="mb-2">
              <label htmlFor="yearFilter" className="text-gray-700">Filter by Year Received: </label>
              <input
                type="number"
                id="yearFilter"
                value={filterYearReceived}
                onChange={(e) => setFilterYearReceived(Number(e.target.value))}
                className="border p-1 rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
                <label htmlFor="monthFilter" className="text-gray-700">Filter by Month Received: </label>
                <select
                  id="monthFilter"
                  value={filterMonthReceived}
                  onChange={(e) => setFilterMonthReceived(Number(e.target.value))}
                  className="border p-1 rounded focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Month</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {new Date(0, i).toLocaleString('default', { month: 'long' })}
                    </option>
                  ))}
                </select>
              </div>

              <div>
           <label htmlFor="unitFilter" className="text-gray-700">Filter by Units: </label>
           <select
              id="unitFilter"
              value={filterUnit}
              onChange={(e) => setFilterUnit(e.target.value)}
             className="border p-1 rounded focus:ring-blue-500 focus:border-blue-500"
               >
             <option value="">Select Unit</option>
              {unitOptions.map((unit) => (
               <option key={unit.ID} value={unit.ID}>
                 {unit.type}
                </option>
                 ))}
                 </select>
            </div>

            <div>
           <label htmlFor="documentTypeFilter" className="text-gray-700">Filter by Filing Category: </label>
           <select
              id="documentTypeFilter"
              value={filterDocumentType}
              onChange={(e) => setFilterDocumentType(e.target.value)}
             className="border p-1 rounded focus:ring-blue-500 focus:border-blue-500"
               >
             <option value="">Select Filing Category</option>
              {documentTypeOptions.map((document_type) => (
               <option key={document_type.ID} value={document_type.ID}>
                 {document_type.type}
                </option>
                 ))}
                 </select>
            </div>

            <div>
           <label htmlFor="statusFilter" className="text-gray-700">Filter by Status: </label>
           <select
              id="statusFilter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
             className="border p-1 rounded focus:ring-blue-500 focus:border-blue-500"
               >
             <option value="">Select Status</option>
              {statusOptions.map((status) => (
               <option key={status.ID} value={status.ID}>
                 {status.type}
                </option>
                 ))}
                 </select>
            </div>

            {/* <div>
           <label htmlFor="personnelFilter" className="text-gray-700">Filter by Personnel: </label>
           <select
              id="personnelFilter"
              value={filterPersonnel}
              onChange={(e) => setFilterPersonnel(e.target.value)}
             className="border p-1 rounded focus:ring-blue-500 focus:border-blue-500"
               >
             <option value="">Select Personnel</option>
              {personnelOptions.map((list_personnel) => (
               <option key={list_personnel.ID} value={list_personnel.ID}>
                 {list_personnel.first_name} {list_personnel.last_name}
                </option>
                 ))}
                 </select>
            </div> */}
              
            <div className="mt-4">
              <label htmlFor="startDate" className="text-gray-700">Date Received Start Date: </label>
              <input
                type="date"
                id="startDate"
                value={startDateReceived}
                onChange={(e) => setStartDateReceived(e.target.value)}
                className="border p-1 rounded focus:ring-blue-500 focus:border-blue-500"
              />
              <label htmlFor="endDate" className="ml-4 text-gray-700">Date Received End Date: </label>
              <input
                type="date"
                id="endDate"
                value={endDateReceived}
                onChange={(e) => setEndDateReceived(e.target.value)}
                className="border p-1 rounded focus:ring-blue-500 focus:border-blue-500"
              />
              
            </div>
            
            <div className="overflow-x-auto mt-4 overflow-auto h-96">
              <table className="min-w-full leading-normal">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="text-gray-600">Client Name</th>
                    <th className="text-gray-600">Assigned Personnel</th>
                    <th className="text-gray-600">Unit</th>
                    <th className="text-gray-600">Filing Category</th>
                    <th className="text-gray-600">Date Received</th>
                    <th className="text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDocuments.map((document) => (
                    <tr key={document.doc_ID} className="border-b border-gray-200 hover:bg-gray-100">
                      <td>{document.client_name}</td>
                      <td>{document.contact_firstName} {document.contact_lastName}</td>
                      <td>{document.unit}</td>
                      <td>{document.document_type}</td>
                      <td>{document.date_received}</td>
                      <td>{document.status}</td>
      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* CHART 1 - Occupying the remaining 1/4th of the space */}
        <div className="col-span-1">
          <div className="p-4">
            {/* Chart Component */}
            <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-300 hover:border-indigo-500 transition-all">
              <p className="text-sm font-semibold text-gray-600">Total Communications</p>
              <div className="flex items-center gap-4 mt-2 mb-4">
                <span className="text-4xl leading-loose text-indigo-500">
                  <FaEnvelope />
                </span>
                <p className="text-2xl font-bold text-indigo-500">{communicationCount} Communications</p>
              </div>
              <TEChart type="doughnut" data={documentStatusCounts} />
            </div>
          </div>
        </div>
      </div>


    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

      <div className="md:col-span-1">
        <div className="p-4 border rounded">
         
          Table 2 / CHART
        </div>
      </div>
      <div className="md:col-span-1">
        <div className="p-4 border rounded">
        
          Table 3  / CHART
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
