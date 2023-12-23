import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CommunicationsAdminEditForm({
  
  editFormData,
  personnelOptions,
  institutionsOptions,
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
  <label className="mb-1 text-sm font-semibold">Institution Name</label>
  <select 
    required

    name="inst_id"
    value={editFormData.inst_id}
    onChange={handleChange}
    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
  >
    <option value="">Select Institution</option>
    {institutionsOptions.map((institution) => (
      <option key={institution.inst_id} value={institution.inst_id}>
        {institution.inst_name}
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
          <option key={documentType.doc_type_id} value={documentType.doc_type_id}>
            {documentType.document_type}
          </option>
        ))}
      </select>
    </div>

<div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Date Issued</label>
              <DatePicker
  selected={editFormData.dateIssued ? new Date(editFormData.dateIssued) : null}
  onChange={(date) => handleChange({ target: { name: 'dateIssued', value: date } })}
  dateFormat="MM/dd/yyyy" 
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
       <label className="mb-1 text-sm font-semibold">Assigned to:</label>
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
    {/* <div className="flex flex-col">
  <label className="mb-1 text-sm font-semibold">Institution Name</label>
  <select 
    required

    name="inst_id"
    value={editFormData.inst_id}
    onChange={handleChange}
    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
  >
    <option value="">Select Institution</option>
    {institutionsOptions.map((institution) => (
      <option key={institution.inst_id} value={institution.inst_id}>
        {institution.inst_name}
      </option>
    ))}
  </select>
</div> */}

           

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Department</label>
              <select 
              
                name="department_id"
                value={editFormData.department_id}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Select Department</option>
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
    inst_id: PropTypes.string,
    // department: PropTypes.string,   //sa read
    department_id: PropTypes.number,//sa put
    dateIssued: PropTypes.instanceOf(Date),
    // status: PropTypes.string,      //sa read
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
  institutionsOptions: PropTypes.array.isRequired,
  documentTypeOptions: PropTypes.array.isRequired,
};
