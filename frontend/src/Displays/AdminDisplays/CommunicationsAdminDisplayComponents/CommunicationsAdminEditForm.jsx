import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CommunicationsAdminEditForm({
  // formData,
  editFormData,
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
            <label className="mb-1 text-sm font-semibold">Add File</label>
            <input
              type="file"
              name="file"   
              onChange={handleFileChange} 
              className="border"
            />
          </div>

            <div className="flex flex-col">
  <label className="mb-1 text-sm font-semibold">Document Type</label>
  <select 
   
    name="doc_type_id"
    value={editFormData.doc_type_id}
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
  selected={editFormData.dateIssued ? new Date(editFormData.dateIssued) : null}
  onChange={(date) => handleChange({ target: { name: 'dateIssued', value: date } })}
  dateFormat="MM/dd/yyyy"  // Set the desired date format
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
              <label className="mb-1 text-sm font-semibold">Assignatories</label>
              <select 
               
                name="personnel_id"
                value={editFormData.personnel_id}
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
};
