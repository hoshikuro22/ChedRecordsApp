import PropTypes from 'prop-types';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

export default function DocumentTypesTable({ documentTypes, handleDeleteClick, handleEditClick, currentPage, itemsPerPage }) {

  const indexOfLastdocumentType = currentPage * itemsPerPage;
  const indexOfFirstdocumentType = indexOfLastdocumentType - itemsPerPage;
  const currentdocumentTypes = documentTypes.slice(indexOfFirstdocumentType, indexOfLastdocumentType);

  return (
    <div>
       <table className="min-w-full leading-normal">
       <thead className="bg-gray-200 sticky top-0">
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
                 title="Modify"
                 className="text-blue-500 hover:underline ml-2 font-bold"
                 onClick={() =>  handleEditClick(documentType.Doc_type_ID)}
               >
               <MdEdit size='35px' /> 
               <div className="absolute bg-gray-800 text-white p-2 rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300"></div>
                </button>
                <button
                  title="Delete"
                  className="text-red-500 hover:underline ml-2 font-bold"
                  onClick={() => handleDeleteClick(documentType.Doc_type_ID)}
                >
                  <MdDelete size='35px' />
                  <div className="absolute bg-gray-800 text-white p-2 rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300"></div>
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
