import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { makeRequest } from "../../../../axios";

export default function CommunicationsNormalMoreDetails({
  isInfoModalOpen,
  selectedRowData,
  setInfoModalOpen,
  documentHistory,
}) {
  return (
    <div>
      {isInfoModalOpen && selectedRowData && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="bg-white rounded-lg p-8 z-50">
            <h2 className="text-xl font-semibold mb-4">
              Communications Information History
            </h2>

            <table className="w-full">
              <thead>
                <tr className="bg-gray-200">
                  {/* <th className="px-4 py-2">History ID</th> */}
                  <th className="px-4 py-2">Document ID</th>
                  <th className="px-4 py-2">File</th>
                  <th className="px-4 py-2">Document Type</th>
                  <th className="px-4 py-2">Date Received</th>
                  <th className="px-4 py-2">Date Released</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Remarks</th>
                  <th className="px-4 py-2">Tags</th>
                  <th className="px-4 py-2">Assigned Personnel</th>
                  <th className="px-4 py-2">Document Type</th>
                </tr>
              </thead>

              <tbody>
                {documentHistory.map((item, index) => (
                  <tr key={index}>
                    {/* <td className="border px-4 py-2 text-center">{item.doc_history_id}</td> */}
                    <td className="border px-4 py-2 text-center">
                      {item.doc_id}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <FileLink item={item} />
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {item.document_type}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {item.date_received}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {item.date_released}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {item.status}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {item.remarks}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {item.tags}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {item.contact_firstName} {item.contact_lastName}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {item.document_type}
                    </td>
                  </tr>
                ))}
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

CommunicationsNormalMoreDetails.propTypes = {
  isInfoModalOpen: PropTypes.bool,
  selectedRowData: PropTypes.object,
  setInfoModalOpen: PropTypes.func,
  documentHistory: PropTypes.array,
};

const FileLink = ({ item }) => {
  const [fileUrl, setFileUrl] = useState(`communicationfiles/${item.file}`);

  useEffect(() => {
    const checkFile = async () => {
      try {
        const response = await makeRequest.get(fileUrl);

        if (!response.ok) {
          setFileUrl(`communicationfiles/${item.file}`);
        }
      } catch (error) {
        console.error("Error fetching file:", error);
        setFileUrl(`communicationhistoryfiles/${item.file}`);
      }
    };

    checkFile();
  }, [item.file, fileUrl]);

  return (
    <a
      href={makeRequest.defaults.baseURL + fileUrl} // Use baseURL from axios.js
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 hover:underline"
    >
      {item.file}
    </a>
  );
};

FileLink.propTypes = {
  item: PropTypes.object,
};
