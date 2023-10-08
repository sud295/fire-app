import './App.css';
import Map from './Map';
import React, { useState } from 'react';
import Form from './Form';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';


const App = () => {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  }

  return (
    <div className="App">
      <div className='p-5 text-center bg-light'>
        <h1 className='mb-3'> FireSafe </h1>
      </div>
        <div className={`side-nav ${navOpen ? '' : 'collapsed'}`} 
             style={{width: navOpen ? '15vw' : '4vw'}}>
          <a href="javascript:void(0)" className="close-btn" onClick={toggleNav}>
              {navOpen ? '×' : '☰'}
              </a>
      <Link to="/form"><span className="icon">🔗</span>{navOpen && <span className="link-text"> Report Fire </span>}</Link>
      <Link to="/page2"><span className="icon">🔗</span>{navOpen && <span className="link-text"> Link 2</span>}</Link>
      <Link to="/page3"><span className="icon">🔗</span>{navOpen && <span className="link-text"> Link 3</span>}</Link>
      <Link to="/page4"><span className="icon">🔗</span>{navOpen && <span className="link-text"> Link 4</span>}</Link>
      <Link to="/map"><span className="icon">🔗</span>{navOpen && <span className="link-text"> Back to Map</span>}</Link>

      </div>
  

  <Routes>
    <Route path="*" element={<Map/>}/>
    <Route path="/map" element={<Map/>}/>
    <Route path="/form" element={<Form />} />
    <Route path="/page2" element={<div>Content or Component for Page 2</div>} />
    <Route path="/page3" element={<div>Content or Component for Page 3</div>} />
    <Route path="/page4" element={<div>Content or Component for Page 4</div>} />
  </Routes>
</div>
  );
};

export default App;
