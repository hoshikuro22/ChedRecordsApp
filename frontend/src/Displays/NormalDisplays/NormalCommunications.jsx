import { useState, useEffect } from "react";
import axios from "axios";
import CommunicationsNormalTable from "./CommunicationsNormalDisplayComponent.jsx/CommunicationsNormalTable";
import CommunicationsNormalEditForm from "./CommunicationsNormalDisplayComponent.jsx/CommunicationsNormalEditForm";
import CommunicationsNormalMoreDetails from "./CommunicationsNormalDisplayComponent.jsx/CommunicationsNormalMoreDetails";
import CommunicationsNormalPagination from "./CommunicationsNormalDisplayComponent.jsx/CommunicationsNormalPagination";
import CommunicationsNormalSearchBar from "./CommunicationsNormalDisplayComponent.jsx/CommunicationsNormalSearchBar";



export default function NormalCommunications() {
  const [formData, setFormData] = useState({
    doc_ID: "",
    // file: null,
    documentType: "",
    dateIssued: new Date(),
    status: "",
    assignatories: "",
    department: "",
    remarks: "",
    userID: "", 
  });
  console.log("the formData " + JSON.stringify(formData));

  // for dymanic search for filter
  const [searchQuery, setSearchQuery] = useState("");
  
   const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };




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

        // to fetch personnel for the add and edit form
        const [personnelOptions, setPersonnelOptions] = useState([]);

        useEffect(() => {
       const fetchPersonnelData = async () => {
         try {
           const response = await axios.get("http://localhost:8081/getPersonnels");
           setPersonnelOptions(response.data);
           console.log("the personnels " + JSON.stringify(response.data));
         } catch (error) {
           console.error("Error fetching personnel data:", error);
         }
       }; fetchPersonnelData(); }, []);


          // to fetch units for the add and edit form
    const [unitOptions, setUnitOptions] = useState([]);

    useEffect(() => {
   const fetchUnitData = async () => {
     try {
       const response = await axios.get("http://localhost:8081/getUnits");
       setUnitOptions(response.data);
       console.log("the units " + JSON.stringify(response.data));
     } catch (error) {
       console.error("Error fetching units data:", error);
     }
   }; fetchUnitData(); }, []);

            // to fetch client for the add and edit form 
       const [clientsOptions, setclientsOptions] = useState([]);

        useEffect(() => {
        const fetchClientData = async () => {
      try {
         const response = await axios.get("http://localhost:8081/getClients");
          setclientsOptions(response.data);
          console.log("the client " + JSON.stringify(response.data));
          } catch (error) {
         console.error("Error fetching clients data:", error);
        }
       };
        fetchClientData();
     }, []);
         
     // to fetch document type for the add and edit form
     const [documentTypeOptions, setDocumentTypeOptions] = useState([]);
     
     useEffect(() => {
       const fetchDocumentTypeData = async () => {
         try {
           const response = await axios.get("http://localhost:8081/getDocumentTypes");
           setDocumentTypeOptions(response.data);
           console.log("Document types: " + JSON.stringify(response.data));
         } catch (error) {
           console.error("Error fetching document type data:", error);
         }
       };
     
       fetchDocumentTypeData();
     }, []);
     
  
 //===== Edit =====//
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({
    doc_ID: "",
    documentType: "",
    dateReceived: new Date(),
    dateReleased: new Date(),
    status: "", 
    assignatories: "",
    unit: "",
    remarks: "",
    tags: "",
    client: "",
  }); console.log("the EditformData " + JSON.stringify(editFormData));
 

  const handleEditClick = (doc_ID) => {
    const selectedRow = documents.find((document) => document.doc_ID === doc_ID);
    if (selectedRow) {
      console.log("Selected Row Data:", selectedRow);
     selectedRow.doc_ID = String(selectedRow.doc_ID);
     setEditFormData({
      ...selectedRow,
      // file: selectedRow.file ? new File([], selectedRow.file.name) : null,
    });
      setShowEditForm(true);
    }
  };
  

 // the "save form function of edit modal"
 const handleEditSubmit = async (e) => {
  e.preventDefault();
  const userConfirmed = window.confirm("Are you sure you want to save changes?");

  if (!userConfirmed) {
    alert("Changes not saved.");
    return;
  }

  try {
    // Directly format dateIssued to local date string
    const formattedDateReceived = new Date(editFormData.date_received).toLocaleDateString();
    const formattedDateReleased = new Date(editFormData.date_released).toLocaleDateString();

    const response = await axios.put(
      `http://localhost:8081/updateDocumentNormal/${editFormData.doc_ID}`,
      {
        doc_ID: editFormData.doc_ID,
        doc_type_id: editFormData.doc_type_id,
        date_received: formattedDateReceived,
        date_released: formattedDateReleased,
        status_id: editFormData.status_id,
        remarks: editFormData.remarks,
        personnel_id: editFormData.personnel_id,
        client_id: editFormData.client_id,
        unit_id: editFormData.unit_id,
        tags: editFormData.tags,
      }
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


  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1000;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = documents.slice(indexOfFirstItem, indexOfLastItem);

  // for more details
const [selectedRowData, setSelectedRowData] = useState(null);
const [documentHistory, setDocumentHistory] = useState([]);
const [isInfoModalOpen, setInfoModalOpen] = useState(false);

const fetchDocumentHistory = async (doc_ID) => {
  try {
    const response = await axios.get(`http://localhost:8081/getDocumentHistory/${doc_ID}`);
    console.log('API Response:', response.data);
    setDocumentHistory(response.data);
  } catch (error) {
    console.error('Error fetching document history:', error);
  }
};

const handleInfoClick = (doc_ID) => {
  // Find the selected row data based on the doc_id
  const selectedRow = documents.find((document) => document.doc_ID === doc_ID);
  if (selectedRow) {
    setSelectedRowData(selectedRow);
    setInfoModalOpen(true);
    fetchDocumentHistory(doc_ID); // Fetch document history when the modal opens
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




  return (
    <div className="w-screen h-screen mt-2 p-2 ml-2">

      <div className="border-2 border-black p-4 bg-white rounded-lg shadow-md overflow-auto h-[720px]">
        <h2 className="text-xl font-semibold mb-2"></h2>
         <CommunicationsNormalSearchBar
           handleSearchChange={handleSearchChange}
           searchQuery={searchQuery} />


       {/* Table sa pagtawag sa data gikan sa server */}
   <div>
  <CommunicationsNormalTable
    currentItems={currentItems}
    searchQuery={searchQuery}
    // handleDeleteClick={handleDeleteClick}
    handleInfoClick={handleInfoClick}
    handleEditClick={handleEditClick}
    clientsOptions={clientsOptions}
    documentTypeOptions={documentTypeOptions}
    unitOptions={unitOptions}
  />
</div>


  {/* Edit Modal Form */}
   {showEditForm && (
  <CommunicationsNormalEditForm
    editFormData={editFormData}
    personnelOptions={personnelOptions} 
    clientsOptions={clientsOptions}
    documentTypeOptions={documentTypeOptions}
    unitOptions={unitOptions}
    handleEditSubmit={handleEditSubmit}
    handleCloseEditForm={() => setShowEditForm(false)}
    handleChange={(e) => setEditFormData({ ...editFormData, [e.target.name]: e.target.value })}
    // handleFileChange={(e) =>setEditFormData({ ...editFormData, file: e.target.files[0] })  } 
  />
)}


 </div>

   {/* Pagination */}
   <CommunicationsNormalPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        documents={documents}
       itemsPerPage={itemsPerPage}
      />

             {/* Info modal/ MORE DETAILS */}
             <div>
             <CommunicationsNormalMoreDetails
          isInfoModalOpen={isInfoModalOpen}
          selectedRowData={selectedRowData}
           setInfoModalOpen={setInfoModalOpen}
           documentHistory={documentHistory}
/>
             </div>
      

    </div>
  );
}
