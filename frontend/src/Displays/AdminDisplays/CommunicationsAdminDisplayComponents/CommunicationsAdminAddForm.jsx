import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import PropTypes from 'prop-types';



export default function CommunicationsAdminAddForm({
    showForm,
    formData,
    personnelOptions,
    institutionsOptions,
    documentTypeOptions,
    handleChange,
    handleSubmit,
    handleHideFormClick,
    handleClearFormClick,
    handleFileChange,
    handleAddCommunicationClick,
  }) {
  return (
    <div>

{showForm ? (
        <div className="border-2 border-black p-4 bg-white rounded-lg shadow-md mb-4 h-auto">
          <h2 className="text-xl font-semibold mb-2">Add New Communication</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

          <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Add File</label>
            <input
            required
            id="file"
            name="file"
            type="file"
            onChange={handleFileChange}
            className="border">
            </input>
            </div>
            
            <div className="flex flex-col">
      <label className="mb-1 text-sm font-semibold">Document Type</label>
      <select
        required
        id="documentType"
        name="documentType" 
        value={formData.documentType}
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
                selected={formData.dateIssued}
                onChange={(date) => ({ ...formData, dateIssued: date })}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                displayFormat
              />
            </div>
            
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Remarks</label>
              <input
                required
                type="text"
                id="remarks"
                name="remarks"
                placeholder="Enter Remarks"
                value={formData.remarks}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="flex flex-col">
  <label className="mb-1 text-sm font-semibold">Assigned to:</label>
  <select
    required
    id="assignatories"
    name="assignatories"
    value={formData.assignatories}
    onChange={handleChange}
    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
  >
    <option value="">Select Assignatories</option>
    {personnelOptions.map((person) => (
      <option key={person.Personnel_ID} value={person.Personnel_ID}>
        {`${person.Last_Name}, ${person.First_Name}`}
      </option>
    ))}
  </select>
</div>

            

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Department</label>
              <select 
                required
                id="department"
                name="department"
                value={formData.department}
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
  <label className="mb-1 text-sm font-semibold">Institution Name</label>
  <select 
    required
    id="institution"
    name="institution"
    value={formData.institution}
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


            {/* para ma add ang status sa add form */}
             <div className="hidden"> 
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Status</label>
              <select
                required
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="0">Pending</option>
                <option value="1">Approved</option>
                <option value="2">Disapproved</option>
              </select>
            </div>  </div>



            <div className="col-span-2 ml-auto ">
            <button
                
                className="w-auto px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-300 mr-2"
              >
                Add Institution
              </button>
              <button
                
                className="w-auto px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Add Communication
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
          onClick={handleAddCommunicationClick}
          className="w-auto px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300 mb-2"
        >
          Add New Communication
        </button>
      )}




    </div>
  )
}

CommunicationsAdminAddForm.propTypes = {
  showForm: PropTypes.bool.isRequired,
  formData: PropTypes.shape({
    file: PropTypes.object,
    documentType: PropTypes.string.isRequired,
    dateIssued: PropTypes.instanceOf(Date).isRequired,
    status: PropTypes.string.isRequired,
    assignatories: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    remarks: PropTypes.string.isRequired,
    institution: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleHideFormClick: PropTypes.func.isRequired,
  handleClearFormClick: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  handleAddCommunicationClick: PropTypes.func.isRequired,
  personnelOptions: PropTypes.array.isRequired,
  institutionsOptions: PropTypes.array.isRequired,
  documentTypeOptions: PropTypes.array.isRequired,
};
