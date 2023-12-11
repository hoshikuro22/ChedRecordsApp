import { useState, useEffect } from "react";
import axios from "axios";
import CommunicationsNormalAddForm from "./CommunicationsNormalDisplayComponent.jsx/CommunicationsNormalAddForm";
import CommunicationsNormalTable from "./CommunicationsNormalDisplayComponent.jsx/CommunicationsNormalTable";


export default function NormalCommunications() {
  const [formData, setFormData] = useState({
    file: "",
    documentType: "",
    dateIssued: new Date(),
    status: "",
    assignatories: "",
    remarks: "",
  });

  const [documents, setDocuments] = useState([]);

  const [showForm, setShowForm] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = documents.slice(indexOfFirstItem, indexOfLastItem);

  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);



  const handleInfoClick = (doc_ID) => {
    // Find the selected row data based on the inst_id
    const selectedRow = documents.find((document) => document.doc_ID === doc_ID);
    if (selectedRow) {
      setSelectedRowData(selectedRow);
      setInfoModalOpen(true);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get("http://localhost:8081/getDocuments");
      console.log(response.data); // to check the fetched data
      const sortedDocuments = response.data.sort();
      setDocuments(sortedDocuments);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching documents.");
    }
  };


  const getMaxDocID = () => {
    if (documents.length === 0) {
      return 1;
    }
    const maxDocID = Math.max(...documents.map((document) => parseInt(document.doc_ID)));
    return maxDocID + 1;
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };



  const handleAddCommunicationClick = () => {
    setShowForm(true);
  };

  const handleHideFormClick = () => {
    setShowForm(false);
  };



  const handleClearFormClick = () => {
    setFormData({
      file: "",
      documentType: "",
      dateIssued: new Date(),
      status: "" ,
      assignatories: "",
      remarks: "" ,

    });
  };



  // pang add data sa database if eclick ang submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docID = getMaxDocID();
      const formattedDate = formData.dateIssued.toLocaleDateString();
      const response = await axios.post("http://localhost:8081/addDocument", {
        ...formData,
        docID,
        dateIssued: formattedDate,
      });
      if (response.data.Status === "Success") {
        alert("Document added successfully!");
        setFormData({
          file: "",
          documentType: "",
          dateIssued: new Date(),
          assignatories: "",
          remarks: "",
        });
        fetchDocuments();
        setShowForm(false);
      } else {
        alert("Error adding document. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the document.");
    }
  };




  const handleDeleteClick = async (id) => {
  // Show a confirmation dialog
  const confirmDelete = window.confirm("Are you sure you want to delete this client?");

  if (confirmDelete) {
    try {
      const response = await axios.delete(`http://localhost:8081/deleteDocument/${id}`);
      if (response.data.Status === "Success") {
        alert("Document deleted successfully!");
        fetchDocuments(); // Refresh the document list
      } else {
        alert("Error deleting client. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while deleting the client.");
    }
  }
};


  return (
    <div className="w-screen h-screen mt-2 p-2 ml-4">
      <h1 className="font-semibold text-2xl mb-4">COMMUNICATIONS</h1>

      
      {/* The add form */}
      <CommunicationsNormalAddForm
        formData={formData}
        showForm={showForm}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleAddCommunicationClick={handleAddCommunicationClick}
        handleHideFormClick={handleHideFormClick}
        handleClearFormClick={handleClearFormClick}
      />

      <div className="border-2 border-black p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">List of COMMUNICATIONS</h2>


       {/* Table sa pagtawag sa data gikan sa server */}
   <div>
  <CommunicationsNormalTable
    currentItems={currentItems}
    handleDeleteClick={handleDeleteClick}
    handleInfoClick={handleInfoClick}
  />
</div>

 </div>

 <div className="flex justify-between mt-4">
  <button
    onClick={() => setCurrentPage(currentPage - 1)}
    disabled={currentPage === 1}
    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
  >
    Previous
  </button>
  <span>{`Page ${currentPage}`}</span>
  <button
    onClick={() => setCurrentPage(currentPage + 1)}
    disabled={indexOfLastItem >= documents.length}
    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
  >
    Next
  </button>
</div>
             {/* Info modal */}
      {isInfoModalOpen && selectedRowData && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="bg-white rounded-lg p-8 z-50">
            <h2 className="text-xl font-semibold mb-4">Communications Information</h2>

            <div>

               <thead>
                <tr className="bg-gray-200">
                <th className="px-4 py-2">Document ID</th> 
                <th className="px-4 py-2">File</th>
                <th className="px-4 py-2">Document Type</th>
                <th className="px-4 py-2">Date Issued</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Remarks</th>
                <th className="px-4 py-2">Assignatory</th>
                <th className="px-4 py-2">Document Type</th>

                </tr>
               </thead>

              <tbody>
              <tr>
               <td className="border px-4 py-2 text-center">{selectedRowData.doc_ID}</td>
               <td className="border px-4 py-2 text-center">{selectedRowData.file}</td>
               <td className="border px-4 py-2 text-center">{selectedRowData.document_type}</td>
               <td className="border px-4 py-2 text-center">{selectedRowData.date_issued}</td>
               <td className="border px-4 py-2 text-center">{selectedRowData.status}</td>
               <td className="border px-4 py-2 text-center">{selectedRowData.remarks}</td>
               <td className="border px-4 py-2 text-center">{selectedRowData.contact_firstName} {selectedRowData.contact_lastName}</td>
               <td className="border px-4 py-2 text-center">{selectedRowData.document_type}</td>

               </tr>
              </tbody>

            </div>

            <button
              className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={() => setInfoModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
