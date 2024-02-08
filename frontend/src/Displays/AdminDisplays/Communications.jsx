import { useState, useEffect } from "react";

import CommunicationsAdminAddForm from "./CommunicationsAdminDisplayComponents/CommunicationsAdminAddForm";
import CommunicationsAdminTable from "./CommunicationsAdminDisplayComponents/CommunicationsAdminTable";
import CommunicationsAdminPagination from "./CommunicationsAdminDisplayComponents/CommunicationsAdminPagination";
import CommunicationsAdminMoreDetails from "./CommunicationsAdminDisplayComponents/CommunicationsAdminMoreDetails";
import CommunicationsAdminEditForm from "./CommunicationsAdminDisplayComponents/CommunicationsAdminEditForm";
import CommunicationsAdminSearchBar from "./CommunicationsAdminDisplayComponents/CommunicationsAdminSearchBar";
import CommunicationsAdminEditForm2 from "./CommunicationsAdminDisplayComponents/CommunicationsAdminEditForm2";
import { makeRequest } from "../../../axios";

export default function Communications() {
  const [formData, setFormData] = useState({
    doc_ID: "",
    file: null,
    documentType: "",
    dateReceived: new Date(),
    dateReleased: new Date(),
    status: "",
    assignatories: "",
    unit: "",
    remarks: "",
    tags: "",
    client: "",
    userID: "",
  });
  console.log("the formData " + JSON.stringify(formData));

  // to fetch user_ID
  useEffect(() => {
    makeRequest
      .get("/")
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
        const response = await makeRequest.get("/getPersonnels");
        setPersonnelOptions(response.data);
        console.log("the personnels " + JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching personnel data:", error);
      }
    };
    fetchPersonnelData();
  }, []);

  // to fetch units for the add and edit form
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
    };
    fetchUnitData();
  }, []);

  // to fetch client for the add and edit form
  const [clientsOptions, setclientsOptions] = useState([]);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await makeRequest.get("/getClients");
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
        const response = await makeRequest.get("/getDocumentTypes");
        setDocumentTypeOptions(response.data);
        console.log("Document types: " + JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching document type data:", error);
      }
    };

    fetchDocumentTypeData();
  }, []);

  //===== Edit WITH/FOR FILE =====// - BELOW
  const [showEditFileForm, setShowEditFileForm] = useState(false);
  const [editFileFormData, setEditFileFormData] = useState({
    doc_ID: "",
    file: null,
    documentType: "",
    dateReceived: new Date(),
    dateReleased: new Date(),
    status: "",
    assignatories: "",
    unit: "",
    remarks: "",
    tags: "",
    client: "",
  });
  console.log("the EditFileformData " + JSON.stringify(editFileFormData));

  const handleEditFileClick = (doc_ID) => {
    const selectedRow = documents.find(
      (document) => document.doc_ID === doc_ID
    );
    if (selectedRow) {
      console.log("Selected Row Data to edit:", selectedRow);
      selectedRow.doc_ID = String(selectedRow.doc_ID);
      setEditFileFormData({
        ...selectedRow,
        file: selectedRow.file ? new File([], selectedRow.file.name) : null,
      });
      setShowEditFileForm(true);
    }
  };

  // the "save form function of edit modal"
  const handleEditFileSubmit = async (e) => {
    e.preventDefault();
    const userConfirmed = window.confirm(
      "Are you sure you want to save changes?"
    );

    if (!userConfirmed) {
      // User clicked 'Cancel' in the confirmation dialog
      alert("Changes not saved.");
      return;
    }

    try {
      // Create a new FormData object
      const formDataToSend = new FormData();
      // para sa date
      const formattedDateReceived = formData.dateReceived.toLocaleDateString();
      const formattedDateReleased = formData.dateReleased.toLocaleDateString();
      // Append the non-file data to formDataToSend
      formDataToSend.append("doc_ID", String(editFileFormData.doc_ID));
      formDataToSend.append("doc_type_id", editFileFormData.doc_type_id);
      formDataToSend.append("date_received", formattedDateReceived);
      formDataToSend.append("date_released", formattedDateReleased);
      formDataToSend.append("status_id", editFileFormData.status_id);
      formDataToSend.append("personnel_id", editFileFormData.personnel_id);
      formDataToSend.append("unit_id", editFileFormData.unit_id);
      formDataToSend.append("remarks", editFileFormData.remarks);
      formDataToSend.append("tags", editFileFormData.tags);
      formDataToSend.append("client_id", editFileFormData.client_id);

      // Append the file if it exists
      if (editFileFormData.file && editFileFormData.file instanceof File) {
        formDataToSend.append("file", editFileFormData.file);
      }

      // Make the API call to update the document details
      const response = await makeRequest.put(
        `/updateDocumentFile/${editFileFormData.doc_ID}`,
        formDataToSend
      );

      if (response.data.Status === "Success") {
        alert("Document edited successfully!");
        setShowEditFileForm(false);
        fetchDocuments(); // Refresh the document list
      } else {
        alert("Error editing document. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while editing the document.");
    }
  };

  //EDIT WITH/FOR FILE ABOVE

  //EDIT WITHOUT FILE BELOW

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
  });
  console.log("the EditformData " + JSON.stringify(editFormData));

  const handleEditClick = (doc_ID) => {
    const selectedRow = documents.find(
      (document) => document.doc_ID === doc_ID
    );
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
    const userConfirmed = window.confirm(
      "Are you sure you want to save changes?"
    );

    if (!userConfirmed) {
      alert("Changes not saved.");
      return;
    }

    try {
      // Directly format DateReceived to local date string
      const formattedDateReceived = new Date(
        editFormData.date_received
      ).toLocaleDateString();
      // Format dateReleased to local date string
      const formattedDateReleased = new Date(
        editFormData.date_released
      ).toLocaleDateString();

      const response = await makeRequest.put(
        `/updateDocumentNormal/${editFormData.doc_ID}`,
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

  //EDIT WITHOUT FILE ABOVE

  const [documents, setDocuments] = useState([]);

  const [showForm, setShowForm] = useState(false);

  // for dymanic search for filter
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

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
      const response = await makeRequest.get(`/getDocumentHistory/${doc_ID}`);
      console.log("API Response:", response.data);
      setDocumentHistory(response.data);
    } catch (error) {
      console.error("Error fetching document history:", error);
    }
  };

  const handleInfoClick = (doc_ID) => {
    // Find the selected row data based on the inst_id
    const selectedRow = documents.find(
      (document) => document.doc_ID === doc_ID
    );
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
      const response = await makeRequest.get("/getDocuments");
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
    const maxDocID = Math.max(
      ...documents.map((document) => parseInt(document.doc_ID))
    );
    return maxDocID + 1;
  };

  //
  const [selectedPersonnelUnit, setSelectedPersonnelUnit] = useState(null);
  //  all data
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "assignatories") {
      // Find the selected personnel's unit ID
      const selectedPersonnel = personnelOptions.find(
        (person) => person.Personnel_ID === parseInt(value)
      );

      // Update the selected personnel's unit ID
      setSelectedPersonnelUnit(
        selectedPersonnel ? selectedPersonnel.unit_ID : null
      );
      setFormData({
        ...formData,
        unit: selectedPersonnel ? selectedPersonnel.unit_ID : "",
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  // for file in the add and edit form 
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
  
    if (selectedFile) {
      const fileSizeLimit = 25000000; // 25MB in bytes
                         // 25000000     25MB in bytes
                         // 10000000     10MB in bytes
                         //  5000000      5MB in bytes
                         //  1000000      1MB in bytes
                              
      if (selectedFile.size <= fileSizeLimit && selectedFile.type === 'application/pdf') {
        setFormData((prevData) => ({
          ...prevData,
          file: selectedFile,
        }));
      } else {
        // File exceeds the size limit or is not a PDF
        setFormData((prevData) => ({
          ...prevData,
          file: null,
        }));
  
        if (selectedFile.type !== 'application/pdf') {
          alert('Please select a PDF file.');
        } else {
          alert('Please select a file that is no larger than 25MB.');
        }
  
        // Clear the input field
        e.target.value = '';
      }
  
      // Move this inside the if block to access selectedFile
      setEditFileFormData((prevData) => ({
        ...prevData,
        file: selectedFile,
      }));
    }
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
      dateReceived: new Date(),
      dateReleased: new Date(),
      status: "0",
      assignatories: "",
      unit: "",
      remarks: "",
      tags: "",
      client: "",
      userID: prevData.userID,
    }));
  };

  // pang add data sa database if eclick ang submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userConfirmed = window.confirm(
      "Are you sure you want to add this communication?"
    );

    if (!userConfirmed) {
      // User clicked 'Cancel' in the confirmation dialog
      alert("Communication not added.");
      return;
    }
    try {
      const docID = getMaxDocID();
      const formattedDateReceived = formData.dateReceived.toLocaleDateString();
      const formattedDateReleased = formData.dateReleased.toLocaleDateString();
      const formDataToSend = new FormData();

      // Append form data including the file
      formDataToSend.append("docID", docID);
      formDataToSend.append("assignatories", formData.assignatories);
      formDataToSend.append("documentType", formData.documentType);
      formDataToSend.append("dateReceived", formattedDateReceived);
      formDataToSend.append("dateReleased", formattedDateReleased);
      formDataToSend.append("remarks", formData.remarks);
      formDataToSend.append("tags", formData.tags);
      formDataToSend.append("status", formData.status);
      formDataToSend.append("unit", formData.unit);
      formDataToSend.append("client", formData.client);
      formDataToSend.append("file", formData.file);
      formDataToSend.append("userID", formData.userID);

      console.log("the formData to send " + JSON.stringify(formDataToSend));
      const response = await makeRequest.post("/addDocument", formDataToSend);

      if (response.data.Status === "Success") {
        alert("Document added successfully!");
        setFormData((prevData) => ({
          ...prevData,
          file: null,
          documentType: "",
          dateReceived: new Date(),
          dateReleased: new Date(),
          status: "",
          assignatories: "",
          unit: "",
          remarks: "",
          tags: "",
          client: "",
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this client?"
    );

    if (confirmDelete) {
      try {
        // Fetch user information (replace this with your actual method of getting user info)
        const userResponse = await makeRequest.get("/");
        const { User_ID, First_Name, Last_Name } = userResponse.data;

        const deleteResponse = await makeRequest.delete(
          `/deleteDocument/${id}`,
          {
            headers: {
              // Pass user information in headers
              user_ID: User_ID,
              first_Name: First_Name,
              last_Name: Last_Name,
            },
          }
        );

        console.log(
          "delete function call user_id and name: " + User_ID,
          First_Name,
          Last_Name
        );

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

  const [maxDocIDShown, setMaxDocIDShown] = useState(0);

  useEffect(() => {
    // Fetch the maximum Doc_ID when the component mounts
    getMaxDocIDShown();
  }, []);

  // Function to fetch the maximum Doc_ID
  const getMaxDocIDShown = async () => {
    try {
      const response = await makeRequest.get("/getMaxDocIDShown");
      setMaxDocIDShown(response.data.maxDocIDShown);
    } catch (error) {
      console.error("Error fetching max Doc_ID:", error);
    }
  };

  return (
    <div className="h-auto mt-2 p-1 ml-1 ">
      <div className="flex flex-row gap-2">
        {/* Dynamic Search */}
        <CommunicationsAdminSearchBar
          handleSearchChange={handleSearchChange}
          searchQuery={searchQuery}
        />

        {/* The add form */}
        <CommunicationsAdminAddForm
          formData={formData}
          showForm={showForm}
          personnelOptions={personnelOptions}
          clientsOptions={clientsOptions}
          documentTypeOptions={documentTypeOptions}
          unitOptions={unitOptions}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
          handleAddCommunicationClick={handleAddCommunicationClick}
          handleHideFormClick={handleHideFormClick}
          handleClearFormClick={handleClearFormClick}
          maxDocIDShown={maxDocIDShown}
          selectedPersonnelUnit={selectedPersonnelUnit}
        />
      </div>

      <div className="border-2 border-black  bg-white rounded-lg shadow-md overflow-auto h-[720px]">
        <h2 className="text-xl font-semibold "></h2>

        {/* Table sa pagtawag sa data gikan sa server */}
        <div>
          <CommunicationsAdminTable
            currentItems={currentItems}
            searchQuery={searchQuery}
            handleDeleteClick={handleDeleteClick}
            handleInfoClick={handleInfoClick}
            handleEditFileClick={handleEditFileClick}
            handleEditClick={handleEditClick}
            clientsOptions={clientsOptions}
            documentTypeOptions={documentTypeOptions}
            unitOptions={unitOptions}
          />
        </div>

        {/* Edit (file) Modal  Form */}
        {showEditFileForm && (
          <CommunicationsAdminEditForm
            editFileFormData={editFileFormData}
            personnelOptions={personnelOptions}
            clientsOptions={clientsOptions}
            documentTypeOptions={documentTypeOptions}
            unitOptions={unitOptions}
            handleEditFileSubmit={handleEditFileSubmit}
            handleCloseEditForm={() => setShowEditFileForm(false)}
            handleChange={(e) =>
              setEditFileFormData({
                ...editFileFormData,
                [e.target.name]: e.target.value,
              })
            }
            handleFileChange={handleFileChange}
          />
        )}

        {/* Edit(no file) Modal Form */}
        {showEditForm && (
          <CommunicationsAdminEditForm2
            editFormData={editFormData}
            personnelOptions={personnelOptions}
            clientsOptions={clientsOptions}
            documentTypeOptions={documentTypeOptions}
            unitOptions={unitOptions}
            handleEditSubmit={handleEditSubmit}
            handleCloseEditForm={() => setShowEditForm(false)}
            handleChange={(e) =>
              setEditFormData({
                ...editFormData,
                [e.target.name]: e.target.value,
              })
            }
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
          documentHistory={documentHistory}
        />
      </div>
    </div>
  );
}
