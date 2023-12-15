import { useState, useEffect } from "react";
import axios from "axios";
import CommunicationsAdminAddForm from "./CommunicationsAdminDisplayComponents/CommunicationsAdminAddForm";
import CommunicationsAdminTable from "./CommunicationsAdminDisplayComponents/CommunicationsAdminTable";
import CommunicationsAdminPagination from "./CommunicationsAdminDisplayComponents/CommunicationsAdminPagination";
import CommunicationsAdminMoreDetails from "./CommunicationsAdminDisplayComponents/CommunicationsAdminMoreDetails";
import CommunicationsAdminEditForm from "./CommunicationsAdminDisplayComponents/CommunicationsAdminEditForm";


export default function Communications() {
  const [formData, setFormData] = useState({
    doc_ID: "",
    file: null,
    documentType: "",
    dateIssued: new Date(),
    status: "",
    assignatories: "",
    department: "",
    remarks: "",
    userID: "", 
  });
  console.log("the formData " + JSON.stringify(formData));


    // to fetch user_ID
    useEffect(() => {
      axios
        .get("http://localhost:8081")
        .then((res) => {
          const userID = res.data.User_ID;
          console.log("Communications-This is the User_ID: " + userID);
          // Set the userID in the state
          setFormData((prevData) => ({ ...prevData, userID }));
        })
        .catch((error) => {
          console.error("Error fetching User_ID:", error);
        });
    }, []);
  
 //===== Edit =====//
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({
    doc_ID: "",
    file: null,
    documentType: "",
    dateIssued: new Date(),
    status: "", 
    assignatories: "",
    department: "",
    remarks: "",
  }); console.log("the EditformData " + JSON.stringify(editFormData));
 

  const handleEditClick = (doc_ID) => {
    const selectedRow = documents.find((document) => document.doc_ID === doc_ID);
    if (selectedRow) {
      console.log("Selected Row Data:", selectedRow);
     selectedRow.doc_ID = String(selectedRow.doc_ID);
     setEditFormData({
      ...selectedRow,
      file: selectedRow.file ? new File([], selectedRow.file.name) : null,
    });
      setShowEditForm(true);
    }
  };
  

  // the "save form function of edit modal"
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const userConfirmed = window.confirm("Are you sure you want to save changes?");

    if (!userConfirmed) {
        // User clicked 'Cancel' in the confirmation dialog
        alert("Changes not saved.");
        return;
    }

      try {
        // Create a new FormData object
        const formDataToSend = new FormData();
        // para sa date 
        const formattedDate = formData.dateIssued.toLocaleDateString();
        // Append the non-file data to formDataToSend
        formDataToSend.append("doc_ID", String(editFormData.doc_ID));
        formDataToSend.append("doc_type_id", editFormData.doc_type_id);
        formDataToSend.append("dateIssued", formattedDate);
        formDataToSend.append("status_id", editFormData.status_id);
        formDataToSend.append("personnel_id", editFormData.personnel_id);
        formDataToSend.append("department_id", editFormData.department_id);
        formDataToSend.append("remarks", editFormData.remarks);
  
        // Append the file if it exists
        if (editFormData.file && editFormData.file instanceof File) {
          formDataToSend.append("file", editFormData.file);
        }
        
      
        // Make the API call to update the document details
        const response = await axios.put(
          `http://localhost:8081/updateDocument/${editFormData.doc_ID}`,
          formDataToSend
        );
  
        if (response.data.Status === "Success") {
          alert("Document edited successfully!");
          setShowEditForm(false);
          fetchDocuments(); // Refresh the document list
        } else {
          alert("Error editing document. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while editing the document.");
      }
  };
  
  
  //EDIT



  const [documents, setDocuments] = useState([]);

  const [showForm, setShowForm] = useState(false);

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = documents.slice(indexOfFirstItem, indexOfLastItem);

  // for more details
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


  // to fetch 
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
  
//  all data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
// for file in the add form only
const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];
  setFormData((prevData) => ({
    ...prevData,
    file: selectedFile,
  }));
};



  const handleAddCommunicationClick = () => {
    setShowForm(true);
  };

  const handleHideFormClick = () => {
    setShowForm(false);
  };



  const handleClearFormClick = () => {
    setFormData((prevData) => ({
      ...prevData,
      doc_ID: "",
      file: null,
      documentType: "",
      dateIssued: new Date(),
      status: "0",
      assignatories: "",
      department: "",
      remarks: "",
      userID: prevData.userID,
    }));
  };


  // pang add data sa database if eclick ang submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userConfirmed = window.confirm("Are you sure you want to add this communication?");

    if (!userConfirmed) {
        // User clicked 'Cancel' in the confirmation dialog
        alert("Communication not added.");
        return;
    }
    try {
      const docID = getMaxDocID();
      const formattedDate = formData.dateIssued.toLocaleDateString();
      const formDataToSend = new FormData();
    
      // Append form data including the file
      formDataToSend.append("docID", docID);
      formDataToSend.append("assignatories", formData.assignatories);
      formDataToSend.append("documentType", formData.documentType);
      formDataToSend.append("dateIssued", formattedDate);
      formDataToSend.append("remarks", formData.remarks);
      formDataToSend.append("status", formData.status);
      formDataToSend.append("department", formData.department);
      formDataToSend.append("file", formData.file);
      formDataToSend.append("userID", formData.userID);

      console.log("the formData to send " + JSON.stringify(formDataToSend));
      const response = await axios.post("http://localhost:8081/addDocument", formDataToSend);
  
      if (response.data.Status === "Success") {
        alert("Document added successfully!");
        setFormData((prevData) => ({
          ...prevData,
          file: null,
          documentType: "",
          dateIssued: new Date(),
          status: "",
          assignatories: "",
          department: "",
          remarks: "",
          userID: prevData.userID,
        }));
      
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
  


// function for delete button

const handleDeleteClick = async (id) => {
  // Show a confirmation dialog
  const confirmDelete = window.confirm("Are you sure you want to delete this client?");

  if (confirmDelete) {
    try {
      // Fetch user information (replace this with your actual method of getting user info)
      const userResponse = await axios.get("http://localhost:8081"); 
      const { User_ID, First_Name, Last_Name } = userResponse.data;

      const deleteResponse = await axios.delete(`http://localhost:8081/deleteDocument/${id}`, {
        headers: {
          // Pass user information in headers
          user_ID: User_ID,
          first_Name: First_Name,
          last_Name: Last_Name,
        },
      });

      console.log("delete function call user_id and name: " + User_ID, First_Name, Last_Name);

      if (deleteResponse.data.Status === "Success") {
        alert("Document deleted successfully!");
        fetchDocuments(); // Refresh the document list
      } else {
        alert("Error deleting document. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while deleting the document (frontend).");
    }
  }
};

  


  return (
    <div className="w-screen h-screen mt-2 p-2 ml-4">
      <h1 className="font-semibold text-2xl mb-4">COMMUNICATIONS</h1>

      
      {/* The add form */}
      <CommunicationsAdminAddForm
        formData={formData}
        showForm={showForm}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
        handleAddCommunicationClick={handleAddCommunicationClick}
        handleHideFormClick={handleHideFormClick}
        handleClearFormClick={handleClearFormClick}
      />

      <div className="border-2 border-black p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">List of COMMUNICATIONS</h2>


       {/* Table sa pagtawag sa data gikan sa server */}
   <div>
  <CommunicationsAdminTable
    currentItems={currentItems}
    handleDeleteClick={handleDeleteClick}
    handleInfoClick={handleInfoClick}
    handleEditClick={handleEditClick}
  />
</div>


  {/* Edit Modal Form */}
   {showEditForm && (
  <CommunicationsAdminEditForm
    editFormData={editFormData}
    handleEditSubmit={handleEditSubmit}
    handleCloseEditForm={() => setShowEditForm(false)}
    handleChange={(e) => setEditFormData({ ...editFormData, [e.target.name]: e.target.value })}
    handleFileChange={(e) =>setEditFormData({ ...editFormData, file: e.target.files[0] })  } 
  />
)}


 </div>

   {/* Pagination */}
   <CommunicationsAdminPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        documents={documents}
       itemsPerPage={itemsPerPage}
      />

             {/* Info modal/ MORE DETAILS */}
             <div>
             <CommunicationsAdminMoreDetails
          isInfoModalOpen={isInfoModalOpen}
          selectedRowData={selectedRowData}
           setInfoModalOpen={setInfoModalOpen}
/>
             </div>
      

    </div>
  );
}
