import PropTypes from 'prop-types';

export default function ChedClientsAdminEditForm({
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
        <h2 className="text-2xl font-semibold mb-4">Edit Client</h2>
        <form onSubmit={handleEditSubmit} className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Client ID:</label>
        <label className='font-semibold text-1xl ml-3'>{editFormData.client_id}</label>
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Name of Client </label>
            <input
              
              type="text"
              name="inst_name"
              placeholder="Enter Name of Institution"
              value={editFormData.inst_name}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Address</label>
            <input
              
              type="text"
              name="address"
              placeholder="Enter Address"
              value={editFormData.address}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Client Type</label>
            <select
              
              name="client_type_id"
              value={editFormData.client_type_id}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Select Client Type</option>
              <option value="1">Internal</option>
              <option value="2">External</option>
            </select>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Contact Person</label>
              <input
                
                type="text"
                name="contact_person"
                placeholder="Enter Name of Contact Person"
                value={editFormData.contact_person}
                onChange={handleChange}
                className="w-80 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="flex flex-col overflow-hidden">
              <label className="mb-1 text-sm font-semibold">Contact Number</label>
              <input
                
                type="text"
                name="contact_number"
                placeholder="Enter Contact Number of Contact Person"
                value={editFormData.contact_number}
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

ChedClientsAdminEditForm.propTypes = {
  editFormData: PropTypes.shape({
    client_id: PropTypes.string,
    inst_name: PropTypes.string, 
    address: PropTypes.string,
    // clientType: PropTypes.string,    //sa read
    client_type_id: PropTypes.number,//sa put
    // filingCat: PropTypes.string,    //sa read
    contact_person: PropTypes.string,
    contact_number: PropTypes.string,
    // file: PropTypes.object.isRequired,
  }).isRequired,
  handleEditSubmit: PropTypes.func.isRequired,
  handleCloseEditForm: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  // handleFileChange: PropTypes.func.isRequired,
};
