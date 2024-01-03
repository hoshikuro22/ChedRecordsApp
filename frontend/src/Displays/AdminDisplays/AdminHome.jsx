

export default function AdminHome() {
  return (
    <div className=" min-h-screen w-screen overflow-auto ml-4">
      <div className="container mx-2 py-8">
        
        <h1 className="text-3xl font-bold mb-4">Welcome to Admin Home</h1>
        <p className="text-lg">This is the admin dashboard. You can manage your content here.</p>
        
        {/* Buttons to navigate to other routes */}
        <div className="mt-6 flex items-center gap-4 ">
         
         <div className="bg-blue-500 hover:bg-blue-700 w-1/4  ">
          <a href="/admin/chedclients"
            className=" text-white text-2xl font-bold py-2 px-4 rounded mr-4 justify-center flex">Ched Clients</a>
            <p>this is desc</p>
          </div>

          <div className="bg-blue-500 hover:bg-blue-700 w-1/4">
          <a href="/admin/communications"
            className=" text-white text-2xl font-bold py-2 px-4 rounded mr-4 justify-center flex">Communications</a>
            <p className="text-white">this is desc</p>
          </div>
          <div className="bg-blue-500 hover:bg-blue-700 w-1/4">
          <a href="/admin/listofpersonnel"
            className=" text-white text-2xl font-bold py-2 px-4 rounded mr-4 justify-center flex"> List of Personnels</a>
            <p>this is desc</p>
            </div>

            <div className="bg-blue-500 hover:bg-blue-700 w-1/4">
          <a href="/admin/reports" 
            className=" text-white text-2xl font-bold py-2 px-4 rounded justify-center flex"> Reports</a>
            <p>this is desc</p>
            </div>
          
        </div>
      </div>
    </div>
  );
}
