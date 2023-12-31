import PropTypes from 'prop-types';

export default function PersonnelAddForm({
   formData, showForm, handleSubmit, handleChange, handleHideFormClick, handleClearFormClick, handleAddPersonnelClick }) {
  return (
    <div>
              {showForm ? (
        <div className="border-2 border-black p-4 bg-white rounded-lg shadow-md mb-4">
          <h2 className="text-xl font-semibold mb-2">Add New PERSONNEL</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">First Name</label>
              <input
                required
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Last Name</label>
              <input
                required
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Position</label>
              <input
                required
                type="text"
                id="position"
                name="position"
                placeholder="Enter Position"
                value={formData.position}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            
           

            <div className="col-span-2 ml-auto gap-">
              <button
                type="submit"
                className="w-auto px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Add Personnel
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
          onClick={handleAddPersonnelClick}
          className="w-auto px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300 mb-2"
        >
          Add New Personnel
        </button>
      )}

    </div>
  )
}
PersonnelAddForm.propTypes = {
    formData: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
    }),
    showForm: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleHideFormClick: PropTypes.func.isRequired,
    handleClearFormClick: PropTypes.func.isRequired,
    handleAddPersonnelClick: PropTypes.func.isRequired,
  };