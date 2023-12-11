
import './App.css'
import { Routes, Route } from 'react-router-dom'

import AdminPage from './Pages/AdminPage'
import LandingPage from './Pages/LandingPage'
import ErrorPage from './Pages/ErrorPage'
import NormalPage from './Pages/NormalPage'
import HomePage from './Pages/HomePage'

function App() {
 

  return (

    <div className=''>
    
      <Routes>
     <Route path='/login/*' element={<LandingPage/>} />              {/* first page to see */}
     <Route path='/admin/*' element={<AdminPage/>} />     {/* activated when /admin  */}
     <Route path='/' element={<HomePage/>} />     {/* activated when /admin  */}
     <Route path='/normal/*' element={<NormalPage/>} />     {/* activated when /staff  */}
     <Route path='/*' element ={<ErrorPage/>} />          {/* activate when /<random> */}
     
       </Routes>
   
    </div>
  );
}

export default App  
