import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { CiEraser } from "react-icons/ci";

export default function CommunicationsAdminAddForm({
  showForm,
  formData,
  personnelOptions,
  clientsOptions,
  documentTypeOptions,
  unitOptions,
  handleChange,
  handleSubmit,
  handleHideFormClick,
  handleClearFormClick,
  handleFileChange,
  handleAddCommunicationClick,
  maxDocIDShown,
}) {
  return (
    <div>
      {showForm ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="bg-white rounded-lg p-8 z-50">
            <div className="flex flex-row">
              <h2 className="text-xl font-semibold mb-2">
                {" "}
                Add New Communication
              </h2>
              <label className="mb-1 text-sm font-semibold right-1 ml-auto">
                DOC ID: <strong> {maxDocIDShown + 1}</strong>
              </label>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div className="flex flex-row gap-2">
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-semibold">
                    Add File <strong>(PDF ONLY)</strong>
                  </label>
                  <input
                    required
                    id="file"
                    name="file"
                    type="file"
                    onChange={handleFileChange}
                    className="border"
                  ></input>
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-semibold">
                    Date Received <strong>(Month/Day/Year)</strong>
                  </label>
                  <DatePicker
                    disabled
                    selected={formData.dateReceived}
                    onChange={(date) =>
                      handleChange({
                        target: { name: "dateReceived", value: date },
                      })
                    }
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    displayFormat
                  />
                </div>

                <div className="flex flex-col ">
                  <label className="mb-1 text-sm font-semibold">
                    Date Released
                  </label>
                  <DatePicker
                    selected={formData.dateReleased}
                    onChange={(date) =>
                      handleChange({
                        target: { name: "dateReleased", value: date },
                      })
                    }
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    displayFormat
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">
                  Document Type/Filing Category
                </label>
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
                    <option
                      key={documentType.Doc_type_ID}
                      value={documentType.Doc_type_ID}
                    >
                      {documentType.type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">
                  Client Name
                </label>
                <select
                  required
                  id="client"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="">Select Client</option>
                  {clientsOptions.map((client) => (
                    <option key={client.client_id} value={client.client_id}>
                      {client.client_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-row gap-6">
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-semibold">
                    Assigned Personnel
                  </label>
                  <select
                    required
                    id="assignatories"
                    name="assignatories"
                    value={formData.assignatories}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  >
                    <option value="">Assigned Personnel</option>
                    {personnelOptions.map((person) => (
                      <option
                        key={person.Personnel_ID}
                        value={person.Personnel_ID}
                      >
                        {`${person.last_name}, ${person.first_name}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-semibold">Unit</label>
                  <select
                    name="unit"
                    value={formData.unit}
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
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">
                  Remarks (Optional)
                </label>
                <input
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
                <label className="mb-1 text-sm font-semibold">
                  Tags (Optional)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  placeholder="Enter Tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              {/* para ma add ang status sa add form */}
              <div className="">
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
                    <option value="3">No Action</option>
                  </select>
                </div>
              </div>

              <div className="col-span-2 flex ml-auto">
                <div className="flex">
                  <button className="flex gap-2 w-auto px-4 py-2 text-white font-bold bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300 ">
                    <IoMdAdd size="25px" /> ADD
                  </button>
                  <button
                    type="button"
                    onClick={handleHideFormClick}
                    className="flex gap-2 w-auto  px-4 py-2 text-white font-bold bg-red-500 rounded-lg hover:bg-red-600 transition duration-300 mx-2 "
                  >
                    <IoMdClose size="25px" /> CLOSE
                  </button>
                  <button
                    type="button"
                    onClick={handleClearFormClick}
                    className="flex gap-2 w-auto  px-4 py-2 text-white font-bold bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-300"
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
          onClick={handleAddCommunicationClick}
          className="w-auto px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300 mb-2 flex gap-2"
        >
          {" "}
          <IoMdAdd size="25px" /> Add New Communication
        </button>
      )}
    </div>
  );
}

CommunicationsAdminAddForm.propTypes = {
  showForm: PropTypes.bool.isRequired,
  formData: PropTypes.shape({
    file: PropTypes.object,
    documentType: PropTypes.string.isRequired,
    dateReceived: PropTypes.instanceOf(Date).isRequired,
    dateReleased: PropTypes.string,
    status: PropTypes.string.isRequired,
    assignatories: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
    remarks: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    client: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleHideFormClick: PropTypes.func.isRequired,
  handleClearFormClick: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  handleAddCommunicationClick: PropTypes.func.isRequired,
  personnelOptions: PropTypes.array.isRequired,
  clientsOptions: PropTypes.array.isRequired,
  documentTypeOptions: PropTypes.array.isRequired,
  unitOptions: PropTypes.array.isRequired,
  maxDocIDShown: PropTypes.number.isRequired,
};
