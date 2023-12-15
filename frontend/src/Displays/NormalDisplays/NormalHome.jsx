

export default function NormalHome() {
  return (
    <div className=" min-h-screen w-screen overflow-auto ml-4">
      <div className="container mx-2 py-8">
        <div>
          Objective of the study
        </div>
        <h1 className="text-3xl font-bold mb-4">Welcome to Normal Staff Home</h1>
        <p className="text-lg">This is the normal staff dashboard. You can manage your content here.</p>
        
        {/* Buttons to navigate to other routes */}
        <div className="mt-6 flex items-center">
         
         
          <a href="/normal/nchedclients"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Ched Clients</a>
          
          <a href="/normal/ncommunications"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Communications</a>
          
          {/* <a href="/admin/listofpersonnel"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"> List of Personnels</a>
            
          <a href="/admin/reports" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Reports</a> */}
        
          
        </div>
      </div>
    </div>
  );
}
