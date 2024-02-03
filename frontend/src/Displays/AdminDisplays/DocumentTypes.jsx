import { useState, useEffect } from "react";

import DocumentTypesAddForm from "./DocumentTypesAdminDisplayComponent/DocumentTypesAddForm";
import DocumentTypesTable from "./DocumentTypesAdminDisplayComponent/DocumentTypesTable";
import DocumentTypesPagination from "./DocumentTypesAdminDisplayComponent/DocumentTypesPagination";
import DocumentTypesEditForm from "./DocumentTypesAdminDisplayComponent/DocumentTypesEditForm";
import { makeRequest } from "../../../axios";

export default function DocumentTypes() {
  const [formData, setFormData] = useState({
    documentType: "",
    remarks: "",
  });
  console.log("the formData " + JSON.stringify(formData));

  const handleCloseEditForm = () => {
    setShowEditForm(false);
  };

  //===== Edit =====//
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({
    documentType: "",
    remarks: "",
  });
  console.log("the EditformData " + JSON.stringify(editFormData));

  const handleEditClick = (Doc_type_ID) => {
    const selectedRow = documentTypes.find(
      (documentType) => documentType.Doc_type_ID === Doc_type_ID
    );
    if (selectedRow) {
      console.log("Selected Row Data to edit:", selectedRow);
      setEditFormData({
        ...selectedRow,
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
      // User clicked 'Cancel' in the confirmation dialog
      alert("Changes not saved.");
      return;
    }

    try {
      const response = await makeRequest.put(
        `/updateDocumentType/${editFormData.doc_type_id}`,
        {
          doc_type_id: editFormData.doc_type_id,
          type: editFormData.type,
          remarks: editFormData.remarks,
        }
      );

      if (response.data.Status === "Success") {
        alert("Document Type edited successfully!");
        setShowEditForm(false);
        fetchDocumentTypes(); // Refresh the document types list
      } else {
        alert("Error editing document types. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while editing the document types.");
    }
  };

  const [documentTypes, setDocumentTypes] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1000;

  useEffect(() => {
    fetchDocumentTypes();
  }, []);

  const fetchDocumentTypes = async () => {
    try {
      const response = await makeRequest.get("/getDocumentTypes");
      console.log(response.data); // line to check the fetched data
      const sortedDocumentTypes = response.data.sort();
      setDocumentTypes(sortedDocumentTypes);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching document types.");
    }
  };

  const getMaxDocumentTypeID = () => {
    if (documentTypes.length === 0) {
      return 1;
    }
    const maxDocumentTypeID = Math.max(
      ...documentTypes.map((documentType) => parseInt(documentType.Doc_type_ID))
    );
    return maxDocumentTypeID + 1;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddDocumentTypeClick = () => {
    setShowForm(true);
  };

  const handleHideFormClick = () => {
    setShowForm(false);
  };

  const handleClearFormClick = () => {
    setFormData({
      documentType: "",
      remarks: "",
    });
  };

  // add document type
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Display a confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to add this document type?"
    );

    if (!isConfirmed) {
      // If the user cancels the confirmation, do nothing
      return;
    }

    try {
      const documentTypeID = getMaxDocumentTypeID();
      const response = await makeRequest.post("/addDocumentType", {
        ...formData,
        documentTypeID,
      });
      if (response.data.Status === "Success") {
        alert("Document type added successfully!");
        setFormData({
          documentType: "",
          remarks: "",
        });
        fetchDocumentTypes();
        setShowForm(false);
      } else {
        alert("Error adding document type. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the document type.");
    }
  };

  // delete document type
  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this document type?"
    );
    if (confirmDelete) {
      try {
        const response = await makeRequest.delete(`/deleteDocumentType/${id}`);
        if (response.data.Status === "Success") {
          alert("Document type deleted successfully!");
          fetchDocumentTypes();
        } else {
          alert("Error deleting document type. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while deleting the document type.");
      }
    }
  };

  return (
    <div className="h-auto mt-2 p-1 ml-5">
      <DocumentTypesAddForm
        formData={formData}
        showForm={showForm}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleHideFormClick={handleHideFormClick}
        handleClearFormClick={handleClearFormClick}
        handleAddDocumentTypeClick={handleAddDocumentTypeClick}
      />

      <div className="border-2 border-black bg-white rounded-lg shadow-md overflow-auto h-[720px]">
        <h2 className="text-xl font-semibold"></h2>

        <DocumentTypesTable
          documentTypes={documentTypes}
          handleDeleteClick={handleDeleteClick}
          handleEditClick={handleEditClick}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />

        {/* Edit Modal Form */}
        {showEditForm && (
          <DocumentTypesEditForm
            editFormData={editFormData}
            handleEditSubmit={handleEditSubmit}
            handleCloseEditForm={handleCloseEditForm}
            handleChange={(e) =>
              setEditFormData({
                ...editFormData,
                [e.target.name]: e.target.value,
              })
            }
          />
        )}
      </div>
      <DocumentTypesPagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={documentTypes.length}
        setCurrentPage={setCurrentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
