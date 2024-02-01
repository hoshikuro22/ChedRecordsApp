import PropTypes from 'prop-types';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

export default function CommunicationsAdminEditForm2({
  editFormData,
  personnelOptions,
  clientsOptions,
  documentTypeOptions,
  unitOptions,
  handleEditSubmit,
  handleCloseEditForm,
  handleChange,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div className="bg-white rounded-lg p-8 z-50">
        <span className="close text-white" onClick={handleCloseEditForm}>
          &times;
        </span>
        <h2 className="text-2xl font-semibold mb-4">Modify Record</h2>
        <form onSubmit={handleEditSubmit} className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Document ID:</label>
            <label className="font-semibold text-1xl ml-3">
              #{editFormData.doc_ID}
            </label>
          </div>

          <div className="flex flex-col">
  <label className="mb-1 text-sm font-semibold">Client Name</label>
  <select 
    
    name="client_id"
    value={editFormData.client_id}
    onChange={handleChange}
    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 border-blue-500"
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
        name="doc_type_id" 
        value={editFormData.doc_type_id}
        onChange={handleChange}
        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 border-blue-500"
      >
        <option value="">Select Document Type</option>
        {documentTypeOptions.map((documentType) => (
          <option key={documentType.Doc_type_ID} value={documentType.Doc_type_ID}>
            {documentType.type}
          </option>
        ))}
      </select>
    </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-bold">Remarks</label>
            <input
              type="text"
              id="remarks"
              name="remarks"
              placeholder="Enter Remarks"
              value={editFormData.remarks}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 border-blue-500"
            />
          </div>

          <div className="hidden flex-col">
              <label className="mb-1 text-sm font-semibold">Date Received</label>
              <input
                disabled
                type="text"
                id="date_received"
                name="date_received"
                placeholder="Enter date_received"
                value={editFormData.date_received}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 border-gray-500"
              />
            </div>
            <div className="hidden flex-col">
              <label className="mb-1 text-sm font-semibold">Date Released</label>
              <input
                disabled
                type="text"
                id="date_released"
                name="date_released"
                placeholder="Enter date_released"
                value={editFormData.date_released}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 border-gray-500"
              />
            </div>

          <div className="flex flex-col" >
       <label className="mb-1 text-sm font-semibold">Assigned to:</label>
  <select
    name="personnel_id"
    value={editFormData.personnel_id}
    onChange={handleChange}
    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 border-blue-500 "
  >
    <option value="">Select Assignatories</option>
    {personnelOptions.map((person) => (
      <option key={person.personnel_id} value={person.personnel_id}>
        {`${person.last_name}, ${person.first_name}`}
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
    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 border-blue-500"
  >
    <option value="">Select Unit</option>
    {unitOptions.map((unit) => (
      <option key={unit.unit_ID} value={unit.unit_ID}>
        {unit.type}
      </option>
    ))}
  </select>
</div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Status</label>
              <select
              
              
                name="status_id"
                value={editFormData.status_id}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 border-blue-500"
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

CommunicationsAdminEditForm2.propTypes = {
  editFormData: PropTypes.shape({
    doc_ID: PropTypes.string,
    doc_type_id: PropTypes.number, 
    date_received: PropTypes.string,
    date_released: PropTypes.string,
    status_id: PropTypes.number,
    remarks: PropTypes.string,
    personnel_id: PropTypes.number,
    client_id: PropTypes.number,
    unit_id: PropTypes.number,
    tags:PropTypes.string,
  }).isRequired,

  handleEditSubmit: PropTypes.func.isRequired,
  handleCloseEditForm: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  personnelOptions: PropTypes.array.isRequired,
  clientsOptions: PropTypes.array.isRequired,
  documentTypeOptions: PropTypes.array.isRequired,
  unitOptions:PropTypes.array.isRequired,
};
