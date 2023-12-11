import PropTypes from 'prop-types';

export default function PersonnelTable({ personnels, handleDeleteClick, currentPage, itemsPerPage }) {

  const indexOfLastPersonnel = currentPage * itemsPerPage;
  const indexOfFirstPersonnel = indexOfLastPersonnel - itemsPerPage;
  const currentPersonnels = personnels.slice(indexOfFirstPersonnel, indexOfLastPersonnel);

  return (
    <div>
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Personnel ID</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Position</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentPersonnels.map((personnel) => (
            <tr key={personnel.Personnel_ID}>
              <td className="border px-4 py-2 text-center">{personnel.Personnel_ID}</td>
              <td className="border px-4 py-2 text-center">{personnel.Last_Name}</td>
              <td className="border px-4 py-2 text-center">{personnel.First_Name}</td>
              <td className="border px-4 py-2 text-center">{personnel.Position}</td>

              <td className="border px-4 py-2 text-center">
                <button className="text-blue-500 hover:underline">Edit</button>
                <button
                  className="text-red-500 hover:underline ml-2"
                  onClick={() => handleDeleteClick(personnel.Personnel_ID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

PersonnelTable.propTypes = {
  personnels: PropTypes.arrayOf(
    PropTypes.shape({
      Personnel_ID: PropTypes.number.isRequired,
      Last_Name: PropTypes.string.isRequired,
      First_Name: PropTypes.string.isRequired,
      Position: PropTypes.string.isRequired,
      // Add other properties as needed
    })
  ).isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
};
