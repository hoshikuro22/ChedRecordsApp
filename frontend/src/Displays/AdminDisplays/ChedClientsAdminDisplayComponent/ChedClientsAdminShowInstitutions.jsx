import { useState } from "react";
import PropTypes from "prop-types";

const ChedClientsAdminShowInstitutions = ({ institutions }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // You can adjust this value as needed

  const handleShowModal = () => {
    setCurrentPage(1); // Reset to the first page when opening the modal
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = institutions.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(institutions.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <button
        onClick={handleShowModal}
        className="w-auto px-4 py-2 text-white bg-slate-600 rounded-lg hover:bg-slate-800 transition duration-300 mb-2"
      >
        Show Institution List
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="bg-white rounded-lg p-8 z-50">
            <h2 className="text-xl font-semibold mb-4">Institution List</h2>

            <table className="w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Seq. No</th>
                  <th className="px-4 py-2">Inst ID</th>
                  <th className="px-4 py-2">Inst Name</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((institution, index) => (
                  <tr key={institution.inst_id}>
                    <td className="border px-4 py-2 text-center">
                      {index + 1 + indexOfFirstItem}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {institution.inst_id}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {institution.inst_name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Next
              </button>
            </div>

            <button
              className="mt-4 px-4 py-2 w-auto text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition duration-300"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

ChedClientsAdminShowInstitutions.propTypes = {
  institutions: PropTypes.array.isRequired,
};

export default ChedClientsAdminShowInstitutions;
