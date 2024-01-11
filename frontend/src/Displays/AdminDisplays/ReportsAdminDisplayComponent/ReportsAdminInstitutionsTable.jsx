import  { useState, useEffect } from 'react';
import axios from 'axios';

export default function ReportsAdminInstitutionsTable() {
  const [reports, setReports] = useState([]);
  //for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/getInstitutionReports");
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reports.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(reports.length / itemsPerPage);

 

  return (
    <div className="mt-2">
      <h1 className="font-bold">Clients Transaction: </h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">TransactionID</th>
              <th className="px-4 py-2">Released By</th>
              <th className="px-4 py-2">Client ID</th>
              <th className="px-4 py-2">Seq No.(From Client)</th>
              <th className="px-4 py-2">Client Name</th>
              <th className="px-4 py-2">Client Type</th>
              <th className="px-4 py-2">Contact Person</th>
              <th className="px-4 py-2">Contact Number</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((report) => (
              <tr key={report.TransactionID}>
                <td className="border px-4 py-2 text-center">{report.TransactionID}</td>
                <td className="border px-4 py-2 text-center">{report.SentBy}</td>
                <td className="border px-4 py-2 text-center">{report.ClientID}</td>
                <td className="border px-4 py-2 text-center">{report.Seq_no}</td>
                <td className="border px-4 py-2 text-center">{report.ClientName}</td>
                <td className="border px-4 py-2 text-center">{report.ClientType}</td>
                <td className="border px-4 py-2 text-center">{report.ContactPerson}</td>
                <td className="border px-4 py-2 text-center">{report.ContactNumber}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination button */}
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
