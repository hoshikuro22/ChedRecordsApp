import PropTypes from 'prop-types';

export default function CommunicationsAdminEditForm({
  
  editFormData,
  personnelOptions,
  clientsOptions,
  documentTypeOptions,
  handleEditSubmit,
  handleCloseEditForm,
  handleChange,
  handleFileChange,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div className="bg-white rounded-lg p-8 z-50">
        <span className="close text-white" onClick={handleCloseEditForm}>
          &times;
        </span>
        <h2 className="text-2xl font-semibold mb-4">Edit Document</h2>
        <form onSubmit={handleEditSubmit} className="grid grid-cols-2 gap-4">

        <div className="flex flex-col">
        <label className="mb-1 text-sm font-semibold">Document ID:</label>
        <label className='font-semibold text-1xl ml-3'>#{editFormData.doc_ID}</label>
          </div>
         
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Add File </label>
            <input
              type="file"
              name="file"   
              onChange={handleFileChange} 
              className="border"
            />
          </div>

          <div className="flex flex-col">
  <label className="mb-1 text-sm font-semibold">Client Name</label>
  <select 
    required

    name="Client_ID"
    value={editFormData.client_id}
    onChange={handleChange}
    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
  >
    <option value="">Select Client</option>
    {clientsOptions.map((client) => (
      <option key={client.client_id} value={client.client_id}>
        {client.client_name}
      </option>
    ))}
  </select>
</div>

<div className="flex flex-col">
      <label className="mb-1 text-sm font-semibold">Document Type</label>
      <select
        required

        name="doc_type_id" 
        value={editFormData.doc_type_id}
        onChange={handleChange}
        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
      >
        <option value="">Select Document Type</option>
        {documentTypeOptions.map((documentType) => (
          <option key={documentType.Doc_type_ID} value={documentType.Doc_type_ID}>
            {documentType.Type}
          </option>
        ))}
      </select>
    </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Date Received</label>
              <input
                
                type="text"
                id="date_received"
                name="date_received"
                placeholder="Enter date_received"
                value={editFormData.date_received}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Date Released</label>
              <input
                
                type="text"
                id="date_released"
                name="date_released"
                placeholder="Enter date_released"
                value={editFormData.date_released}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            
            
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Remarks</label>
              <input
                
                type="text"
                id="remarks"
                name="remarks"
                placeholder="Enter Remarks"
                value={editFormData.remarks}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            

            <div className="flex flex-col">
       <label className="mb-1 text-sm font-semibold">Assigned to: (change term)</label>
  <select
    required
  
    name="personnel_id"
    value={editFormData.personnel_id}
    onChange={handleChange}
    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
  >
    <option value="">Select Assignatories</option>
    {personnelOptions.map((person) => (
      <option key={person.personnel_id} value={person.personnel_id}>
        {`${person.Last_Name}, ${person.First_Name}`}
      </option>
    ))}
     </select>
    </div>
   
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Unit</label>
              <select 
              
                name="unit_id"
                value={editFormData.unit_id}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Select Unit</option>
                <option value="1">Receiving</option>
                <option value="2">Scholarship</option>
                <option value="3">Records</option>
               
              </select>
            </div>

       
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Status</label>
              <select
              
                name="status_id"
                value={editFormData.status_id}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              >
                 <option value="">Select Status</option>
                <option value="0">Pending</option>
                <option value="1">Approved</option>
                <option value="2">Disapproved</option>
              </select>
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

CommunicationsAdminEditForm.propTypes = {
  editFormData: PropTypes.shape({
    doc_ID: PropTypes.string,
    // documentType: PropTypes.string, //sa read
    doc_type_id: PropTypes.number,  //sa put
    // institution: PropTypes.string, // sa read
    client_id: PropTypes.string,
    // unit: PropTypes.string, //sa read
    unit_id: PropTypes.number,//sa put
    date_received: PropTypes.string,
    date_released: PropTypes.string,
    // status: PropTypes.string,   //sa read
    status_id: PropTypes.number,   //sa put
    remarks: PropTypes.string,
    // assignatories: PropTypes.string, //sa read
    personnel_id: PropTypes.number, // sa put
    
   
  }).isRequired,

  handleEditSubmit: PropTypes.func.isRequired,
  handleCloseEditForm: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  personnelOptions: PropTypes.array.isRequired,
  clientsOptions: PropTypes.array.isRequired,
  documentTypeOptions: PropTypes.array.isRequired,
};
