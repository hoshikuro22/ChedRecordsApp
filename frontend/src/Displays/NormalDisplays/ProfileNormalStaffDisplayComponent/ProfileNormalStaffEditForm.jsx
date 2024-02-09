import PropTypes from "prop-types";

export default function ProfileNormalStaffEditForm({
  editFormData,
  handleEditSubmit,
  handleChange,
  closeModal,
  newPassword,
  setNewPassword,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div className="bg-white rounded-lg p-8 z-50">
        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleEditSubmit} className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center">
            <label htmlFor="First_Name" className="mb-1 text-sm font-semibold">
              First Name
            </label>
            <input
              required
              type="text"
              id="First_Name"
              name="First_Name"
              placeholder="Enter First Name"
              value={editFormData.First_Name}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 capitalize"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="Last_Name" className="mb-1 text-sm font-semibold">
              Last Name
            </label>
            <input
              required
              type="text"
              id="Last_Name"
              name="Last_Name"
              placeholder="Enter Last Name"
              value={editFormData.Last_Name}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 capitalize"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="Email" className="mb-1 text-sm font-semibold">
              Email
            </label>
            <input
              required
              type="email"
              id="Email"
              name="Email"
              placeholder="Enter Email"
              value={editFormData.Email}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="Contact_Number"
              className="mb-1 text-sm font-semibold"
            >
              Contact Number
            </label>
            <input
              required
              title="11 digits number only"
              type="tel"
              pattern="[0-9]*" // Allow only numeric input
              id="Contact_Number"
              name="Contact_Number"
              placeholder="Enter Contact Number"
              value={editFormData.Contact_Number}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Username</label>
            <input
              required
              type="text"
              id="Username"
              name="Username"
              placeholder="Enter Username"
              value={editFormData.Username}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="NewPassword" className="mb-1 text-sm font-semibold">
              New Password
            </label>
            <input
              type="password"
              id="NewPassword"
              name="NewPassword"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="col-span-2 flex justify-end gap-4">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

ProfileNormalStaffEditForm.propTypes = {
  editFormData: PropTypes.shape({
    User_ID: PropTypes.number,
    First_Name: PropTypes.string,
    Last_Name: PropTypes.string,
    Email: PropTypes.string,
    Password: PropTypes.string,
    Contact_Number: PropTypes.number,
    Username: PropTypes.string,
  }).isRequired,
  handleEditSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  newPassword: PropTypes.string,
  setNewPassword: PropTypes.func.isRequired,
};
