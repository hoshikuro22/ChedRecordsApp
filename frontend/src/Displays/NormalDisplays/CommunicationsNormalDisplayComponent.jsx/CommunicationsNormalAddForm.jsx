import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import PropTypes from 'prop-types';

export default function CommunicationsNormalAddForm({
    showForm,
    formData,
    handleChange,
    handleSubmit,
    handleHideFormClick,
    handleClearFormClick,
    handleAddCommunicationClick,
  }) {
  return (
    <div>

{showForm ? (
        <div className="border-2 border-black p-4 bg-white rounded-lg shadow-md mb-4">
          <h2 className="text-xl font-semibold mb-2">Add New Communication</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

          <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Add File</label>
            <input
            required
            id="file"
            name="file"
            value={formData.file}
            type="file"
            onChange={handleChange}
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
    <option value="1">OFFICE MEMO MESSAGES</option>
    <option value="2">CERTIFICATES</option>
    <option value="3">RECOMMENDATIONS</option>
    <option value="4">MAIL CERTIFICATES</option>
    <option value="5">REGIONAL LETTER</option>
    <option value="6">REGIONAL MEMO</option>
    <option value="7">SPECIAL TRAVEL ORDER</option>
    <option value="8">GOVERNMENT OFFICE</option>
    <option value="9">CHED MANILA</option>
    <option value="10">MISCELLANEOUS</option>
    <option value="11">SPECIAL ORDER DEFICIENCY</option>
    <option value="12">APPROVED/REPLY LETTERS TO SCHOLARS</option>
    <option value="13">GOVERNMENT RECOGNITION</option>
    <option value="14">CERTIFICATE OF PROGRAM COMPLETION- SUCS</option>
    <option value="15">GOVERNMENT AUTHORITY-LUCS</option>
    <option value="16">GOVERNMENT PERMIT</option>
    <option value="17">COA-CHED 10 COMMUNICATION</option>
    <option value="18">CHED MEMORANDUM</option>
    <option value="19">SPECIAL ORDER DUPLICATES</option>
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
              <label className="mb-1 text-sm font-semibold">Assignatories</label>
              <select 
                required
                id="assignatories"
                name="assignatories"
                value={formData.assignatories}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Select Assignatories</option>
                <option value="1">La Victoria, Von</option>
                <option value="2">Magdua, Jemry</option>
                <option value="3">Lagrosas, Tipsy</option>
                <option value="4">Rogi, Shi</option>
                <option value="5">Sagaki Murasaki</option>
              </select>
            </div>



            <div className="col-span-2 ml-auto ">
              
              <button
                type="submit"
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

CommunicationsNormalAddForm.propTypes = {
    showForm: PropTypes.bool.isRequired,
    formData: PropTypes.shape({
      file: PropTypes.string.isRequired,
      documentType: PropTypes.string.isRequired,
      dateIssued: PropTypes.instanceOf(Date).isRequired,
      status: PropTypes.string.isRequired,
      assignatories: PropTypes.string.isRequired,
      remarks: PropTypes.string.isRequired,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleHideFormClick: PropTypes.func.isRequired,
    handleClearFormClick: PropTypes.func.isRequired,
    handleAddCommunicationClick: PropTypes.func.isRequired,
  };