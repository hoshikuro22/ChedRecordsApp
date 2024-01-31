import PropTypes from "prop-types";

export default function AddAccountAdminTable({ users, handleEditClick}) {
  return (
    <div>
  <table className="table-auto w-full border-collapse border">
  <thead>
    <tr className="bg-gray-200">
      {/* <th className="px-4 py-2">User ID</th> */}
      <th className="px-4 py-2">User Type</th>
      <th className="px-4 py-2">First Name</th>
      <th className="px-4 py-2">Last Name</th>
      <th className="px-4 py-2">Username</th>
      {/* <th className="px-4 py-2">Password</th> */}
      <th className="px-4 py-2">Mobile Number</th>
      <th className="px-4 py-2">Email</th>
      <th className="px-4 py-2">Action</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user) => (
      <tr key={user.user_ID}>
        {/* <td className="border px-4 py-2">{user.user_ID}</td> */}
        <td className="border px-4 py-2">{user.user_type}</td>
        <td className="border px-4 py-2">{user.first_name}</td>
        <td className="border px-4 py-2">{user.last_name}</td>
        <td className="border px-4 py-2">{user.username}</td>
        {/* <td className="border px-4 py-2">{user.password}</td> */}
        <td className="border px-4 py-2">{user.contact_number}</td>
        <td className="border px-4 py-2">{user.email}</td>
        <td className="border px-4 py-2">
          <button
            // ang pk sa ChedClients / Institution is "id"
            className="text-blue-500 hover:underline font-bold"
            onClick={() => handleEditClick(user.user_ID)}
          >
            MODIFY
          </button>
          {/* <button
            // ang pk sa ChedClients / Institution is "id"
            className="text-red-500 hover:underline ml-2"
            onClick={() => handleDeleteClick(user.user_ID)}
          >
            Delete
          </button> */}

        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  )
}

AddAccountAdminTable.propTypes = {
    users: PropTypes.array.isRequired,
    // handleDeleteClick: PropTypes.func.isRequired,
    handleEditClick: PropTypes.func.isRequired,
  };