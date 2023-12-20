import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import PropTypes from 'prop-types';

export default function CommunicationsAdminAddForm({
    showForm,
    formData,
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
  <label className="mb-1 text-sm font-semibold">Filing Category</label>
  <select 
    required
    id="documentType"
    name="documentType"
    value={formData.documentType}
    onChange={handleChange}
    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
  >
    <option value="">Select Filing Category</option>
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
              <label className="mb-1 text-sm font-semibold">Assigned to:  (mag fetch dapat)</label>
              <select 
                required
                id="assignatories"
                name="assignatories"
                value={formData.assignatories}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              >
              <option value="">Select Assignatories</option>
              <option value="1">Bernal, Freddie</option>
              <option value="2">Apag, Desiderio III</option>
              <option value="3">Bag-o, Maria Dejeaneth</option>
              <option value="4">Bolasco, Angelica Katrina</option>
              <option value="5">Cotejar, Lilia</option>
              <option value="6">Duplito, Jay Loienie</option>
              <option value="7">Fernandez, Glarigen</option>
              <option value="8">Fuentes, Miriam</option>
              <option value="9">Galapin, Laiza Anna</option>
              <option value="10">Gomez, Leonora</option>
              <option value="11">Ladera, Virgil Thery Amor</option>
              <option value="12">Lopez, Elmer</option>
              <option value="13">Lumasag, Rose Mae</option>
              <option value="14">Lumongsod, Jasmin</option>
              <option value="15">Medez, Sarah Jane</option>
              <option value="16">Minguez, Arlita Amapola</option>
              <option value="17">Morong, Abraham, Jr.</option>
              <option value="18">Pamplona, Daryl Glenn</option>
              <option value="19">Pasagad, Abegail</option>
              <option value="20">Raagas, Susan Daisy</option>
              <option value="21">Torres, Mark Godfrey</option>

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
              <label className="mb-1 text-sm font-semibold">Institution Name (Mag fetch dapat)</label>
              <select 
                required
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Select Institution</option>
                <option value="1">Receiving</option>
                <option value="2">Scholarship</option>
                <option value="3">Records</option>
               
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
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleHideFormClick: PropTypes.func.isRequired,
  handleClearFormClick: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  handleAddCommunicationClick: PropTypes.func.isRequired,
};
