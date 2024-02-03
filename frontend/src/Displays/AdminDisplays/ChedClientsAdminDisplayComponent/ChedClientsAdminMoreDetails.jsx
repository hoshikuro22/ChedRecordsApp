import PropTypes from "prop-types";

export default function ChedClientsAdminMoreDetails({
  isInfoModalOpen,
  setInfoModalOpen,
  selectedRowData,
}) {
  return (
    <div>
      {isInfoModalOpen && selectedRowData && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="bg-white rounded-lg p-8 z-50">
            <h2 className="text-xl font-semibold mb-4">Client Information</h2>

            <table className="w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Client ID</th>
                  <th className="px-4 py-2">Name of Client</th>
                  <th className="px-4 py-2">Address</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Contact Person</th>
                  <th className="px-4 py-2">Mobile Number</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="border px-4 py-2 text-center">
                    {selectedRowData.client_id}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {selectedRowData.client_name}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {selectedRowData.address}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {selectedRowData.email}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {selectedRowData.contact_person}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {selectedRowData.contact_number}
                  </td>
                </tr>
              </tbody>
            </table>

            <button
              className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300 mr-3"
              onClick={() => setInfoModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

ChedClientsAdminMoreDetails.propTypes = {
  isInfoModalOpen: PropTypes.bool.isRequired,
  setInfoModalOpen: PropTypes.func.isRequired,
  selectedRowData: PropTypes.shape({
    client_id: PropTypes.string.isRequired,
    client_name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    contact_person: PropTypes.string.isRequired,
    contact_number: PropTypes.string.isRequired,
  }),
};
