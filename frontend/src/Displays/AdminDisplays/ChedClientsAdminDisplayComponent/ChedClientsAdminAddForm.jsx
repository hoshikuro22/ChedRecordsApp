import PropTypes from "prop-types";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { CiEraser } from "react-icons/ci";

export default function ChedClientsAdminAddForm({
  handleSubmit,
  showForm,
  formData,
  clientTypeOptions,
  handleAddClientClick,
  handleHideFormClick,
  handleClearFormClick,
  handleChange,
  // handleFileChange
}) {
  return (
    <div>
      {showForm ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="bg-white rounded-lg p-8 z-50">
            <h2 className="text-xl font-semibold mb-2">Add New Client</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">
                  Client ID{" "}
                  <a className="font-black">(Not Editable when added)</a>
                </label>
                <input
                  required
                  type="text"
                  id="clientID"
                  name="clientID"
                  placeholder="Enter Client ID"
                  value={formData.clientID}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">
                  Name of Client
                </label>
                <input
                  required
                  type="text"
                  id="clientName"
                  name="clientName"
                  placeholder="Enter Name of Client"
                  value={formData.clientName}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Address</label>
                <input
                  required
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">
                  Client Type
                </label>
                <select
                  required
                  id="clientType"
                  name="clientType"
                  value={formData.clientType}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="">Select Client Type</option>
                  {clientTypeOptions.map((clientType) => (
                    <option
                      key={clientType.client_type_id}
                      value={clientType.client_type_id}
                    >
                      {clientType.type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-semibold">
                    Contact Person
                  </label>
                  <input
                    required
                    type="text"
                    id="contactPerson"
                    name="contactPerson"
                    placeholder="Enter Name of Contact Person"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    className="w-80 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <label className="mb-1 text-sm font-semibold">
                    Contact Number (Optional)
                  </label>
                  <input
                    title="11 digits number only"
                    type="tel"
                    pattern="[0-9]*" // Allow only numeric input
                    id="contactNumber"
                    name="contactNumber"
                    placeholder="Enter Contact Number"
                    onChange={handleChange}
                    className="w-80 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
              </div>
              <div className="col-span-2 ml-auto gap-">
                <div className="flex">
                  <button
                    type="submit"
                    className="flex gap-2 w-auto px-4 py-2 text-white font-bold bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    <IoMdAdd size="25px" /> ADD
                  </button>
                  <button
                    type="button"
                    onClick={handleHideFormClick}
                    className="flex gap-2 w-auto px-4 py-2 text-white font-bold bg-red-500 rounded-lg hover:bg-red-600 transition duration-300 mx-2 "
                  >
                    <IoMdClose size="25px" /> CLOSE
                  </button>
                  <button
                    type="button"
                    onClick={handleClearFormClick}
                    className="flex gap-2 w-auto px-4 py-2 text-white font-bold bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-300"
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
          <IoMdAdd size="25px" /> Add New Client
        </button>
      )}
    </div>
  );
}
ChedClientsAdminAddForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  showForm: PropTypes.bool.isRequired,
  formData: PropTypes.shape({
    clientID: PropTypes.string,
    clientName: PropTypes.string,
    address: PropTypes.string,
    clientType: PropTypes.string,
    email: PropTypes.string,
    // filingCat: PropTypes.string,
    contactPerson: PropTypes.string,
    contactNumber: PropTypes.string,
    // file: PropTypes.object,
  }).isRequired,
  handleAddClientClick: PropTypes.func.isRequired,
  handleHideFormClick: PropTypes.func.isRequired,
  handleClearFormClick: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  clientTypeOptions: PropTypes.array.isRequired,
  // handleFileChange: PropTypes.func.isRequired,
};
