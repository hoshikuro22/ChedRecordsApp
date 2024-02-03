import PropTypes from "prop-types";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { CiEraser } from "react-icons/ci";

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
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="bg-white rounded-lg p-8 z-50">
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
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 capitalize"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold ">Last Name</label>
                <input
                  required
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 capitalize"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Email</label>
                <input
                  title="must contain @ and .com "
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
                <label className="mb-1 text-sm font-semibold">
                  Mobile Number
                </label>
                <input
                  required
                  title="Contact number should be up to 11 digits, only numbers"
                  type="tel"
                  pattern="[0-9]*" // Allow only numeric input
                  id="contactNumber"
                  name="contactNumber"
                  placeholder="Enter Contact Number"
                  value={formData.contactNumber}
                  onChange={(e) => {
                    if (e.target.value.length <= 11) {
                      handleChange(e);
                    }
                  }}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Username</label>
                <input
                  required
                  type="text"
                  id="userName"
                  name="userName"
                  placeholder="Enter Username"
                  value={formData.userName}
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
                  <option value="0">Admin - Records Officer</option>
                  <option value="1">Staff - Receiving Clerk</option>
                  <option value="2">Staff - Releasing Clerk</option>
                  <option value="3">Staff - Education Supervisor</option>
                  <option value="4">Staff - Education Specialist</option>
                  <option value="5">Staff - Division Chief</option>
                  <option value="6">Staff - Records Clerk</option>
                </select>
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
                <label className="mb-1 text-sm font-semibold">
                  {" "}
                  ConfirmPassword
                </label>
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

              <div className="col-span-2 ml-auto ">
                <div className="flex">
                  <button
                    type="submit"
                    className="flex gap-2 w-autofont-bold px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    <IoMdAdd size="25px" /> ADD
                  </button>
                  <button
                    type="button"
                    onClick={handleHideFormClick}
                    className="flex gap-2 w-auto font-bold px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300 mx-2 "
                  >
                    <IoMdClose size="25px" /> CLOSE
                  </button>
                  <button
                    type="button"
                    onClick={handleClearFormClick}
                    className="flex gap-2 w-auto font-bold px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-300"
                  >
                    <CiEraser size="25px" /> CLEAR
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <button
          onClick={handleAddClientClick}
          className="w-auto px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300 mb-2 flex gap-2"
        >
          <IoMdAdd size="25px" /> Add New Account
        </button>
      )}
    </div>
  );
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
