import PropTypes from 'prop-types';

export default function ClientTypesTable({ clientTypes, handleDeleteClick, handleEditClick, currentPage, itemsPerPage }) {

  const indexOfLastclientType = currentPage * itemsPerPage;
  const indexOfFirstclientType = indexOfLastclientType - itemsPerPage;
  const currentclientTypes = clientTypes.slice(indexOfFirstclientType, indexOfLastclientType);

  return (
    <div>
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            {/* <th className="px-4 py-2">ID</th> */}
            <th className="px-4 py-2 text-left">Client Type</th>
            <th className="px-4 py-2 text-left">Remarks</th>
            <th className="px-4 py-2 text-left">Action</th>
          

          </tr>
        </thead>
        <tbody>
          {currentclientTypes.map((clientType, index) => (
            <tr key={index}>
              {/* <td className="border px-4 py-2 text-center">{clientType.Doc_type_ID}</td> */}
              <td className="border px-4 py-2 text-left">{clientType.type}</td>
              <td className="border px-4 py-2 text-left">{clientType.remarks}</td>

              <td className="border px-4 py-2 text-left">
              <button
                 className="text-blue-500 hover:underline ml-2 font-bold"
                 onClick={() =>  handleEditClick(clientType.Client_type_ID)}
               >
                 Modify
                </button>
                <button
                  className="text-red-500 hover:underline ml-2 font-bold"
                  onClick={() => handleDeleteClick(clientType.Client_type_ID)}
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

ClientTypesTable.propTypes = {
    clientTypes: PropTypes.arrayOf(
    PropTypes.shape({
      Client_type_ID: PropTypes.number,
      type: PropTypes.string, 
    })
  ).isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
};
