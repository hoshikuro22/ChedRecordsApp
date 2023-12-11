import PropTypes from 'prop-types';

export default function CommunicationsAdminMoreDetails({ 
  isInfoModalOpen,
  selectedRowData,
  setInfoModalOpen
}) {
  return (
    <div>
      {isInfoModalOpen && selectedRowData && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="bg-white rounded-lg p-8 z-50">
            <h2 className="text-xl font-semibold mb-4">Communications Information</h2>

            <table className="w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Document ID</th> 
                  <th className="px-4 py-2">File</th>
                  <th className="px-4 py-2">Document Type</th>
                  <th className="px-4 py-2">Date Issued</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Remarks</th>
                  <th className="px-4 py-2">Assignatory</th>
                  <th className="px-4 py-2">Document Type</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="border px-4 py-2 text-center">{selectedRowData.doc_ID}</td>
                  <td className="border px-4 py-2 text-center">{selectedRowData.file}</td>
                  <td className="border px-4 py-2 text-center">{selectedRowData.document_type}</td>
                  <td className="border px-4 py-2 text-center">{selectedRowData.date_issued}</td>
                  <td className="border px-4 py-2 text-center">{selectedRowData.status}</td>
                  <td className="border px-4 py-2 text-center">{selectedRowData.remarks}</td>
                  <td className="border px-4 py-2 text-center">{selectedRowData.contact_firstName} {selectedRowData.contact_lastName}</td>
                  <td className="border px-4 py-2 text-center">{selectedRowData.document_type}</td>
                </tr>
              </tbody>
            </table>

            <button
              className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
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

CommunicationsAdminMoreDetails.propTypes = {
  isInfoModalOpen: PropTypes.bool,
  selectedRowData: PropTypes.object,
  setInfoModalOpen: PropTypes.func,
};
