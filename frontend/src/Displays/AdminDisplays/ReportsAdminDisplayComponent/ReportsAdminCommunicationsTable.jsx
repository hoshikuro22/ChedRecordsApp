import  { useState, useEffect } from 'react';
import axios from 'axios';

export default function ReportsAdminCommunicationsTable() {
  const [reports, setReports] = useState([]);
  //for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/getCommunicationReports");
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

    //  para ma truncate
    function truncateFileName(fileName, maxLength) {
      if (fileName.length <= maxLength) {
        return fileName;
      } else {
        const truncatedName = fileName.substring(0, maxLength - 3) + "...";
        return truncatedName;
      }
    }
  


  return (
    <div className="mt-2">
      <h1 className="font-bold">Communications Transaction: </h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">TransactionID</th>
              <th className="px-4 py-2">Sent By</th>
              <th className="px-4 py-2">Doc ID</th>
              <th className="px-4 py-2">Assignatory</th>
              <th className="px-4 py-2">Document Type</th>
              <th className="px-4 py-2">Date Issued</th>
              <th className="px-4 py-2">Remarks</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">File Name</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((report) => (
              <tr key={report.TransactionID}>
                <td className="border px-4 py-2 text-center">{report.TransactionID}</td>
                <td className="border px-4 py-2 text-center">{report.SentBy}</td>
                <td className="border px-4 py-2 text-center">{report.DocID}</td>
                <td className="border px-4 py-2 text-center">{report.Assignatories}</td>
                <td className="border px-4 py-2 text-center">{report.DocumentType}</td>
                <td className="border px-4 py-2 text-center">{report.DateIssued}</td>
                <td className="border px-4 py-2 text-center">{report.Remarks}</td>
                <td className="border px-4 py-2 text-center">{report.Department}</td>
                <td className="border px-4 py-2 text-center">{truncateFileName(report.File, 20)}</td>
                <td className="border px-4 py-2 text-center">{report.Status}</td>
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
