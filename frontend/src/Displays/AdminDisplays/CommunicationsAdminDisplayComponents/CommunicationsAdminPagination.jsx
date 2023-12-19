import PropTypes from 'prop-types';

export default function CommunicationsAdminPagination({
  currentPage,
  setCurrentPage,
  documents,
  itemsPerPage,
}) {
  const totalPages = Math.ceil(documents.length / itemsPerPage);

  return (
    
      <div className="flex justify-between mt-4 h-auto mb-24">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Next
        </button>
      </div>
    
  );
}

CommunicationsAdminPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  documents: PropTypes.array.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
};
