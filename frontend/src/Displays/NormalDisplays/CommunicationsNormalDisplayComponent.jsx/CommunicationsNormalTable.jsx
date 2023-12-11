import PropTypes from 'prop-types';

export default function CommunicationsNormalTable({
    currentItems,
    handleDeleteClick,
    handleInfoClick,
  }) {
  return (
    <div>
        
        <table className="table-auto w-full border-collapse border">
  <thead>
    <tr className="bg-gray-200">
      <th className="px-4 py-2">Doc No</th>
      <th className="px-4 py-2">File </th>
      <th className="px-4 py-2">Type</th>
      <th className="px-4 py-2">Date Issued (year/month/date)</th>
      <th className="px-4 py-2">Status</th>
      <th className="px-4 py-2">Remarks</th>
      <th className="px-4 py-2">Action</th>
    </tr>
  </thead>
  <tbody>
    {currentItems.map((document) => (
      <tr key={document.doc_ID}>
        <td className="border px-4 py-2 text-center">{document.doc_ID}</td>
        <td className="border px-4 py-2 text-center">{document.file}</td>
        <td className="border px-4 py-2 text-center">{document.document_type}</td>
        <td className="border px-4 py-2 text-center">{document.date_issued}</td>
        <td className="border px-4 py-2 text-center">{document.status}</td>
        <td className="border px-4 py-2 text-center">{document.remarks}</td>
        <td className="border px-4 py-2 text-center">
          
          <button
            // ang pk sa ChedClients / Institution is "id"
            className="text-blue-500 hover:underline "
          >
            Edit
          </button>
          <button
            // ang pk sa ChedClients / Institution is "id"
            className="text-red-500 hover:underline ml-2"
            onClick={() => handleDeleteClick(document.doc_ID)}
          >
            Delete
          </button>
          <button
          className="text-gray-500 hover:underline ml-2"
         onClick={() =>  handleInfoClick(document.doc_ID)}
        >
          More Details
        </button>
          
        </td>
      </tr>
    ))}
  </tbody>
</table>



    </div>
  )
}

CommunicationsNormalTable.propTypes = {
    currentItems: PropTypes.array.isRequired,
    handleDeleteClick: PropTypes.func.isRequired,
    handleInfoClick: PropTypes.func.isRequired,
  };
