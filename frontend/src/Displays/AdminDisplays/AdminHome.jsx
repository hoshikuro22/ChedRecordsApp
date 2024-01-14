

export default function AdminHome() {
  return (
    <div className=" min-h-screen w-screen overflow-auto ml-4">
      <div className="container mx-2 py-8">
        
        <h1 className="text-3xl font-bold mb-4">Welcome to Admin Home</h1>
        <p className="text-lg">This is the admin dashboard. You can manage your content here.</p>
        
        {/* Buttons to navigate to other routes */}
        <div className="mt-6 flex items-center gap-4 ">
         
        <a className="bg-blue-500 hover:bg-blue-700 w-1/5 h-64"
            href="/admin/communications">
            <a className=" text-white text-2xl font-bold py-2 px-4 rounded mr-4 justify-center flex">Communications</a>
            <p className="text-white text-center mt-20 underline">Handle communications</p>
          </a>

         <a className="bg-blue-500 hover:bg-blue-700 w-1/5 h-64 "
          href="/admin/chedclients">
            <a className=" text-white text-2xl font-bold py-2 px-4 rounded mr-4 justify-center flex">Ched Clients</a>
            <p className="text-white text-center mt-20  underline">Manage clients associated with Ched</p>
          </a>

          <a className="bg-blue-500 hover:bg-blue-700 w-1/5 h-64 "
          href="/admin/documenttypes">
            <a className=" text-white text-2xl font-bold py-2 px-4 rounded mr-4 justify-center flex">Document Types</a>
            <p className="text-white text-center mt-20  underline mx-2">Manage document types associated with Ched</p>
          </a>

          <a className="bg-blue-500 hover:bg-blue-700 w-1/5 h-64"
          href="/admin/listofpersonnel">
            <a className=" text-white text-2xl font-bold py-2 px-4 rounded mr-4 justify-center flex"> List of Personnels</a>
            <p className="text-white text-center mt-20 underline mx-2">View and manage personnels</p>
            </a>

            <a className="bg-blue-500 hover:bg-blue-700 w-1/5 h-64"
             href="/admin/reports" >
            <a className=" text-white text-2xl font-bold py-2 px-4 rounded justify-center flex"> Reports</a>
            <p className="text-white text-center mt-20 underline">Reports for administrative purposes</p>
            </a>
          
        </div>
      </div>
    </div>
  );
}
