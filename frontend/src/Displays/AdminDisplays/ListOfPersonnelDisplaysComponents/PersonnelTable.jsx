import PropTypes from 'prop-types';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function PersonnelTable({ personnels, handleDeleteClick, handleEditClick, currentPage, itemsPerPage }) {

  const indexOfLastPersonnel = currentPage * itemsPerPage;
  const indexOfFirstPersonnel = indexOfLastPersonnel - itemsPerPage;
  const currentPersonnels = personnels.slice(indexOfFirstPersonnel, indexOfLastPersonnel);

  return (
    <div className='relative'> 
      <table className="min-w-full leading-normal">
      <thead className="bg-gray-200 sticky top-0">
          <tr className="bg-gray-200">
            {/* <th className="px-4 py-2">Personnel ID</th> */}
            <th className="px-3 py-2">Last Name</th>
            <th className="px-3 py-2">First Name</th>
            <th className="px-3 py-2">Position</th>
            <th className="px-3 py-2">Unit</th>
            <th className="px-3 py-2">Birth Date</th>
            <th className="px-3 py-2">Email</th>
            <th className="px-3 py-2">Mobile Number</th>
            <th className="px-3 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentPersonnels.map((personnel) => (
            <tr key={personnel.Personnel_ID}>
              {/* <td className="border px-4 py-2 text-center">{personnel.Personnel_ID}</td> */}
              <td className="border px-4 py-2 text-left">{personnel.last_name}</td>
              <td className="border px-4 py-2 text-left">{personnel.first_name}</td>
              <td className="border px-4 py-2 text-left">{personnel.position}</td>
              <td className="border px-4 py-2 text-left">{personnel.unit_type}</td>
              <td className="border px-4 py-2 text-left">{personnel.birth_date}</td>
              <td className="border px-4 py-2 text-left">{personnel.email}</td>
              <td className="border px-4 py-2 text-left">{personnel.contact_number}</td>

              <td className="border px-4 py-2 text-left flex">
                <button
                 title="Modify"
                 className="text-blue-500 hover:underline ml-2 font-bold"
                 onClick={() =>  handleEditClick(personnel.Personnel_ID)}
               >
                 <MdEdit size='35px'/>
                 <div className="absolute bg-gray-800 text-white p-2 rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300"></div>
                </button>
                <button
                  title="Delete"
                  className="text-red-500 hover:underline ml-2 font-bold"
                  onClick={() => handleDeleteClick(personnel.Personnel_ID)}
                >
                  <MdDelete size='35px'/>
                  <div className="absolute bg-gray-800 text-white p-2 rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300"></div>
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
  personnels: PropTypes.array.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
};
