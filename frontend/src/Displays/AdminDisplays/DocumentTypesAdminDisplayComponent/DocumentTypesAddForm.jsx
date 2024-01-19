import PropTypes from 'prop-types';

export default function DocumentTypesAddForm({
   formData, showForm, handleSubmit, handleChange, handleHideFormClick, handleClearFormClick, handleAddDocumentTypeClick }) {
  return (
    <div>
              {showForm ? (
          <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="bg-white rounded-lg p-8 z-50">
          <h2 className="text-xl font-semibold mb-2">Add New DOCUMENT TYPE</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Document Type</label>
              <input
                required
                type="text"
                id="documentType"
                name="documentType"
                placeholder="Enter Document Type"
                value={formData.documentType}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
              </div>
            
            
           

            <div className="col-span-2 ml-auto ">
              <button
                type="submit"
                className="w-40 px-4 py-2 text-white font-bold bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                ADD
              </button>
              <button
                type="button"
                onClick={handleHideFormClick}
                className="w-40 px-4 py-2 text-white font-bold bg-red-500 rounded-lg hover:bg-red-600 transition duration-300 mx-2 "
              >
                CLOSE
              </button>
              <button
                type="button"
                onClick={handleClearFormClick}
                className="w-40 px-4 py-2 text-white font-bold bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                CLEAR
              </button>
            </div>
          </form>
          </div>
        </div>
      ) : (
        <button
          onClick={handleAddDocumentTypeClick}
          className="w-auto px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300 mb-2"
        >
          Add New Document Type
        </button>
      )}

    </div>
  )
}
DocumentTypesAddForm.propTypes = {
    formData: PropTypes.shape({
        documentType: PropTypes.string.isRequired,
    }),
    showForm: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleHideFormClick: PropTypes.func.isRequired,
    handleClearFormClick: PropTypes.func.isRequired,
    handleAddDocumentTypeClick: PropTypes.func.isRequired,
  };