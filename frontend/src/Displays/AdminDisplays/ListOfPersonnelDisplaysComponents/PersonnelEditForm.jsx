import PropTypes from 'prop-types';

export default function PersonnelEditForm({
  editFormData,
  handleEditSubmit,
  handleCloseEditForm,
  handleChange,
  unitOptions,
}) {
  
  
  return (
    
    <div className="fixed inset-0 flex items-center justify-center">
      
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div className="bg-white rounded-lg p-8 z-50">
        <span className="close text-white" onClick={handleCloseEditForm}>&times;</span>
        <h2 className="text-2xl font-semibold mb-4">Edit Personnel</h2>
        <form onSubmit={handleEditSubmit} className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">First Name</label>
            <input
              type="text"
              name="first_name"
              placeholder="Enter First Name"
              value={editFormData.first_name}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Last Name</label>
            <input
              type="text"
              name="last_name"
              placeholder="Enter Last Name"
              value={editFormData.last_name}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Unit</label>
              <select 
  required
    name="unit_ID"
    value={editFormData.unit_ID}
    onChange={handleChange}
    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
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
            <label className="mb-1 text-sm font-semibold">Position</label>
            <input
              type="text"
              name="position"
              placeholder="Enter Position"
              value={editFormData.position}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Birth Date</label>
            <input
              type="text"
              name="birth_date"
              placeholder="Enter Birth Date"
              value={editFormData.birth_date}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={editFormData.email}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Contact Number</label>
            <input
              type="text"
              name="contact_number"
              placeholder="Enter Contact Number"
              value={editFormData.contact_number}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
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

PersonnelEditForm.propTypes = {
  editFormData: PropTypes.shape({
    Personnel_ID: PropTypes.string,
    unit_ID: PropTypes.string, 
    last_name: PropTypes.string,
    first_name: PropTypes.string,
    position: PropTypes.string, 
    birth_date: PropTypes.string,
    email: PropTypes.string,
    contact_number: PropTypes.string,
  }).isRequired,
  handleEditSubmit: PropTypes.func.isRequired,
  handleCloseEditForm: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  unitOptions: PropTypes.array.isRequired,
  // handleFileChange: PropTypes.func.isRequired,
};
