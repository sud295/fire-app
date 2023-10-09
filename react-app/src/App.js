import './App.css';
import Map from './Map';
import React, { useState } from 'react';
import Form from './Form';
import PotentialFires from './PotentialFires';

import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';


const App = () => {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  }

  return (
    <div className="App">
      <div className='p-5 text-center bg-light'>
        <h1 className='mb-3'> FireSafe</h1>
      </div>
        <div className={`side-nav ${navOpen ? '' : 'collapsed'}`} 
             style={{width: navOpen ? '15vw' : '4vw'}}>
          <a href="javascript:void(0)" className="close-btn" onClick={toggleNav}>
              {navOpen ? '×' : '☰'}
              </a>
      <Link to="/form"><span className="icon">🔗</span>{navOpen && <span className="link-text"> Report Fire </span>}</Link>
      <Link to="/potentialfires"><span className="icon">🔗</span>{navOpen && <span className="link-text"> Potential Fires</span>}</Link>
  
      <Link to="/map"><span className="icon">🔗</span>{navOpen && <span className="link-text"> Back to Map</span>}</Link>

      </div>
  

  <Routes>
    <Route path="*" element={<Map/>}/>
    <Route path="/map" element={<Map/>}/>
    <Route path="/form" element={<Form />} />
    <Route path="/potentialfires" element={<PotentialFires/>} />
    
  </Routes>
</div>
  );
};

export default App;
