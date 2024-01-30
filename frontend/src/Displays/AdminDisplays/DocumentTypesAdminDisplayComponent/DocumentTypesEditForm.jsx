import PropTypes from 'prop-types';

export default function DocumentTypesEditForm({
  editFormData,
  handleEditSubmit,
  handleCloseEditForm,
  handleChange,
}) {
  
  
  return (
    
    <div className="fixed inset-0 flex items-center justify-center">
      
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div className="bg-white rounded-lg p-8 z-50">
        <span className="close text-white" onClick={handleCloseEditForm}>&times;</span>
        <h2 className="text-2xl font-semibold mb-4">Edit Document Type</h2>
        <form onSubmit={handleEditSubmit} className="grid grid-cols-2 gap-4">

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Document Type</label>
            <input
              type="text"
              name="type"
              placeholder="Enter Document Type"
              value={editFormData.type}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Remarks (Optional)</label>
            <input
              type="text"
              name="remarks"
              placeholder="Enter remarks"
              value={editFormData.remarks}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="col-span-2 ml-auto gap-">
            <button
              type="submit"
              className="w-40 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleCloseEditForm}
              className="w-40 px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-300 mx-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

DocumentTypesEditForm.propTypes = {
  editFormData: PropTypes.shape({
    doc_type_id: PropTypes.string,
    type: PropTypes.string,
    remarks: PropTypes.string,
  }).isRequired,
  handleEditSubmit: PropTypes.func.isRequired,
  handleCloseEditForm: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  // handleFileChange: PropTypes.func.isRequired,
};
