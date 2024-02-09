import { useState, useEffect } from 'react';
import { makeRequest } from '../../../axios';

export default function ActivityLog() {
  const [activityLog, setActivityLog] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(1000);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Use makeRequest to fetch data with a dynamic URL
      const response = await makeRequest.get('/getActivityLog');
      const data = response.data;

      // Update the state with the fetched data
      setActivityLog(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = activityLog.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(activityLog.length / itemsPerPage);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(dateString).toLocaleString('en-US', options);
  };
  

  

  return (
    <div className="h-screen mt-8 p-1 ml-1">
       <div className="border-2 border-black p-1 bg-white rounded-lg shadow-md overflow-auto h-[720px]">
        <h2 className="text-xl font-semibold mb-2">Activity Log: <strong>(Added & Deleted CHED Clients and Communications only)</strong></h2>
         <div className='relative'>
        <table className="table-auto w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Activity ID</th>
              <th className="px-4 py-2">User Account</th>
              <th className="px-4 py-2">Activity</th>
              <th className="px-4 py-2">Date and Time</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((activity) => (
              <tr key={activity.ActivityID}>
                <td className="border px-4 py-2 text-left">{activity.ActivityID}</td>
                <td className="border px-4 py-2 text-left">{activity.UserAccount}</td>
                <td className="border px-4 py-2 text-left">{activity.Activity}</td>
                <td className="border px-4 py-2 text-left">{formatDate(activity.DateAndTime)}</td>

              </tr>
            ))}
          </tbody>
        </table></div>


      </div>

              {/* Pagination */}
              <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Previous
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Next
          </button>
        </div>
    </div>
  );
}
