import { useState, useEffect } from "react";
import axios from "axios";

import DocumentTypesAddForm from "./DocumentTypesAdminDisplayComponent/DocumentTypesAddForm";
import DocumentTypesTable from "./DocumentTypesAdminDisplayComponent/DocumentTypesTable";
import DocumentTypesPagination from "./DocumentTypesAdminDisplayComponent/DocumentTypesPagination";

export default function DocumentTypes() {
  const [formData, setFormData] = useState({
    documentType: "",
    
  });
  console.log("the formData " + JSON.stringify(formData));

  const [documentTypes, setDocumentTypes] = useState([]);
  const [showForm, setShowForm] = useState(false);

    // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  useEffect(() => {
    fetchDocumentTypes();
  }, []);

  const fetchDocumentTypes = async () => {
    try {
      const response = await axios.get("http://localhost:8081/getDocumentTypes");
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
    const maxDocumentTypeID = Math.max(...documentTypes.map((documentType) => parseInt(documentType.Doc_type_ID)));
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
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const documentTypeID = getMaxDocumentTypeID();
      const response = await axios.post("http://localhost:8081/addDocumentType", {
        ...formData,
        documentTypeID,
      });
      if (response.data.Status === "Success") {
        alert("Document type added successfully!");
        setFormData({
            documentType: "",
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

  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this document type?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:8081/deleteDocumentType/${id}`);
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
    <div className="w-screen h-auto mt-8 p-4 ml-4">
      <h1 className="font-semibold text-2xl mb-4">LIST OF DOCUMENT TYPES</h1>

      <DocumentTypesAddForm
        formData={formData}
        showForm={showForm}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleHideFormClick={handleHideFormClick}
        handleClearFormClick={handleClearFormClick}
        handleAddDocumentTypeClick={handleAddDocumentTypeClick}
      />

      <div className="border-2 border-black p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">List of DOCUMENT TYPES</h2>

        <DocumentTypesTable
          documentTypes={documentTypes}
          handleDeleteClick={handleDeleteClick}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />

        <DocumentTypesPagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={documentTypes.length}
          setCurrentPage={setCurrentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
