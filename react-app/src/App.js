import './App.css';
import Map from './Map';
import React, { useState } from 'react';

const App = () => {
  const [navOpen, setNavOpen] = useState(true);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  }

  return (
    <div className="App">
      <div className='p-5 text-center bg-light'>
        <h1 className='mb-3'> Fire Map</h1>
      </div>
      <header className="App-header">
        <Map/>

        <div className={`side-nav ${navOpen ? '' : 'collapsed'}`} 
             style={{width: navOpen ? '15vw' : '4vw'}}>
          <a href="javascript:void(0)" className="close-btn" onClick={toggleNav}>
              {navOpen ? '×' : '☰'}
          </a>
          <a href="#"><span className="icon">🔗</span>{navOpen && <span className="link-text"> Link 1</span>}</a>
          <a href="#"><span className="icon">🔗</span>{navOpen && <span className="link-text"> Link 2</span>}</a>
          <a href="#"><span className="icon">🔗</span>{navOpen && <span className="link-text"> Link 3</span>}</a>
          <a href="#"><span className="icon">🔗</span>{navOpen && <span className="link-text"> Link 4</span>}</a>

        </div>
      </header>
    </div>
  );
};

export default App;
