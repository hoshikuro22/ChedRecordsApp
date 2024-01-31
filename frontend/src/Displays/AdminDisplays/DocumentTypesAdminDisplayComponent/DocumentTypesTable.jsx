import PropTypes from 'prop-types';

export default function DocumentTypesTable({ documentTypes, handleDeleteClick, handleEditClick, currentPage, itemsPerPage }) {

  const indexOfLastdocumentType = currentPage * itemsPerPage;
  const indexOfFirstdocumentType = indexOfLastdocumentType - itemsPerPage;
  const currentdocumentTypes = documentTypes.slice(indexOfFirstdocumentType, indexOfLastdocumentType);

  return (
    <div>
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            {/* <th className="px-4 py-2">ID</th> */}
            <th className="px-4 py-2 text-center">Document Type</th>
            <th className="px-4 py-2 text-left">Remarks</th>
            <th className="px-4 py-2 text-left">Action</th>
          

          </tr>
        </thead>
        <tbody>
          {currentdocumentTypes.map((documentType, index) => (
            <tr key={index}>
              {/* <td className="border px-4 py-2 text-center">{documentType.Doc_type_ID}</td> */}
              <td className="border px-4 py-2 text-left">{documentType.type}</td>
              <td className="border px-4 py-2 text-left">{documentType.remarks}</td>

              <td className="border px-4 py-2 text-left">
              <button
                 className="text-blue-500 hover:underline ml-2 font-bold"
                 onClick={() =>  handleEditClick(documentType.Doc_type_ID)}
               >
                 Modify
                </button>
                <button
                  className="text-red-500 hover:underline ml-2 font-bold"
                  onClick={() => handleDeleteClick(documentType.Doc_type_ID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

DocumentTypesTable.propTypes = {
  documentTypes: PropTypes.arrayOf(
    PropTypes.shape({
      Doc_type_ID: PropTypes.number,
      type: PropTypes.string, 
    })
  ).isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
};
