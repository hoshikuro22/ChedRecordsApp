import PropTypes from "prop-types";

import { FaMagnifyingGlass } from "react-icons/fa6";

export default function CommunicationsNormalSearchBar({
  searchQuery,
  handleSearchChange,
}) {
  return (
    <div className="mb-4 flex items-center gap-4">
      <input
        type="text"
        placeholder=" Search "
        value={searchQuery}
        onChange={handleSearchChange}
        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
      />
      <FaMagnifyingGlass />
    </div>
  );
}
CommunicationsNormalSearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
};
