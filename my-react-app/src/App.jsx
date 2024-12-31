import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import ProTaskStatistics from './ProTaskStatistics'
import AddTask from './AddTask'
import ContactPage from './ContactPage'
import Navbar from './Navbar';
import Hero from './Hero';
import HelpPage from './HelpPage';

function App() {
 

  return (
    <>

<Router>
      <div>
        <Navbar />
        <main className="p-4">
          <Routes>
            <Route path='/' element={<Hero />}/>
            <Route path='/contact' element={<ContactPage />}/>
            <Route path='/help' element={<HelpPage />}/>
            <Route path='/add' element={<AddTask />}/>
            <Route path='/stat' element={<ProTaskStatistics />}/>
          </Routes>
        </main>
      </div>
    </Router>
    </>
  )
}

export default App
