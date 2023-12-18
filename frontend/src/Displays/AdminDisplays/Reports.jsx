import { useState } from 'react';
import ReportsAdminCommunicationsTable from './ReportsAdminDisplayComponent/ReportsAdminCommunicationsTable';
import ReportsAdminInstitutionsTable from './ReportsAdminDisplayComponent/ReportsAdminInstitutionsTable';

export default function Reports() {
  const [showInstitutions, setShowInstitutions] = useState(true);
  const [showCommunications, setShowCommunications] = useState(false);

  const handleToggleInstitutions = () => {
    setShowInstitutions(true);
    setShowCommunications(false);
  };

  const handleToggleCommunications = () => {
    setShowInstitutions(false);
    setShowCommunications(true);
  };

  return (
    <div className="duration-500 w-screen h-auto mt-8 bg-gray-100 p-8">
      <div className="border-2 border-black p-4 bg-white rounded-lg shadow-md ">
        <h1 className="font-semibold text-2xl mb-4 ml-3">Report Records:</h1>

        <div className="flex">
          <button
            className={`${
              showInstitutions
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            } px-4 py-2 mr-2 rounded-lg`}
            onClick={handleToggleInstitutions}
          >
            Institution Reports
          </button>
          <button
            className={`${
              showCommunications
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            } px-4 py-2 rounded-lg`}
            onClick={handleToggleCommunications}
          >
            Communication Reports
          </button>
        </div>

        {showInstitutions && <ReportsAdminInstitutionsTable />}
        {showCommunications && <ReportsAdminCommunicationsTable />}
      </div>
    </div>
  );
}
