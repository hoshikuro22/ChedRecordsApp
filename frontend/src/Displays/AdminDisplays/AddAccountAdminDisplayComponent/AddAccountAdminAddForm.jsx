import PropTypes from "prop-types";

export default function AddAccountAdminAddForm({
    showForm,
    formData,
    confirmPassword,
    handleChange,
    handleAddClientClick,
    handleHideFormClick,
    handleClearFormClick,
    handleSubmit,
  }) {
  return (
    <div>
              {showForm ? (
        <div className="border-2 border-black p-4 bg-white rounded-lg shadow-md mb-4">
          <h2 className="text-xl font-semibold mb-2">Add New Account</h2>
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
              <label className="mb-1 text-sm font-semibold">Email</label>
              <input
                required
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Password</label>
              <input
                required
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">User Type</label>
              <select
                required
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Select User Type</option>
                <option value="0">Admin</option>
                <option value="1">Normal</option>
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold"> ConfirmPassword</label>
              <input
                required
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Contact Number</label>
              <input
                required
                type="text"
                id="contactNumber"
                name="contactNumber"
                placeholder="Enter Contact Number"
                value={formData.contactNumber}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          
           

            <div className="col-span-2 ml-auto gap-">
              <button
                type="submit"
                className="w-auto px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Add Account
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
          onClick={handleAddClientClick}
          className="w-auto px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300 mb-2"
        >
          Add New Account
        </button>
      )}
    </div>
  )
}

AddAccountAdminAddForm.propTypes = {
    showForm: PropTypes.bool.isRequired,
    formData: PropTypes.object.isRequired,
    confirmPassword: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleAddClientClick: PropTypes.func.isRequired,
    handleHideFormClick: PropTypes.func.isRequired,
    handleClearFormClick: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };