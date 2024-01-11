import PropTypes from 'prop-types';

export default function ChedClientsAdminAddForm({
    handleSubmit,
    showForm,
    formData,
    handleAddClientClick,
    handleHideFormClick,
    handleClearFormClick,
    handleChange,
    // handleFileChange
  }) {

  return (
    <div>
        
        {showForm ? (
        <div className="border-2 border-black p-4 bg-white rounded-lg shadow-md mb-4 h-auto">
          <h2 className="text-xl font-semibold mb-2">Add New Client</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4" >
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Client ID <a className='font-black'>(Not Editable)</a></label>
              <input
                required
                type="text"
                id="clientID"
                name="clientID"
                placeholder="Enter Client ID"
                value={formData.clientID}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Name of Client</label>
              <input
                required
                type="text"
                id="clientName"
                name="clientName"
                placeholder="Enter Name of Client"
                value={formData.clientName}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>  
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Address</label>
              <input
                required
                type="text"
                id="address"
                name="address"
                placeholder="Enter Address"
                value={formData.address}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Client Type</label>
              <select
                required
                id="clientType"
                name="clientType"
                value={formData.clientType}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Select Client Type</option>
                <option value="1">Internal - CHED10</option>
                <option value="2">External - HEIS </option>
            
              </select>
            </div>
            
            <div className="flex gap-4">
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Contact Person</label>
              <input
                required
                type="text"
                id="contactPerson"
                name="contactPerson"
                placeholder="Enter Name of Contact Person"
                value={formData.contactPerson}
                onChange={handleChange}
                className="w-80 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="flex flex-col overflow-hidden">
              <label className="mb-1 text-sm font-semibold">Contact Number</label>
              <input
                required
                type="text"
                id="contactNumber"
                name="contactNumber"
                placeholder="Enter Contact Number of Contact Person"
                onChange={handleChange}
                className="w-80 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            </div>
            <div className="col-span-2 ml-auto gap-">
              <button
                type="submit"
                className="w-40 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Add Client  
              </button>
              <button
                type="button"
                onClick={handleHideFormClick}
                className="w-40 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300 mx-2 "
              >
                Hide Form
              </button>
              <button
                type="button"
                onClick={handleClearFormClick}
                className="w-40 px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                Clear Form
              </button>
            </div>
             
            
          </form>
          
        </div>
        
      ) : (
        <button
          onClick={handleAddClientClick}
          className="w-40 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300 mb-2"
        >
          Add New Client
        </button>
      )}


    </div>
  )
}
ChedClientsAdminAddForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    showForm: PropTypes.bool.isRequired,
    formData: PropTypes.shape({
      clientID: PropTypes.string,
      clientName: PropTypes.string,
      address: PropTypes.string,
      clientType: PropTypes.string,
      // filingCat: PropTypes.string,
      contactPerson: PropTypes.string,
      contactNumber: PropTypes.string,
      // file: PropTypes.object,
    }).isRequired,
    handleAddClientClick: PropTypes.func.isRequired,
    handleHideFormClick: PropTypes.func.isRequired,
    handleClearFormClick: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    // handleFileChange: PropTypes.func.isRequired,
  };