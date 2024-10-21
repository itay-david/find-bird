import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import SearchPage from './SearchPage';
import AdminPage from './AdminPage';
import './styles.css';
import Main from './Main';

function App() {
  return (
    <Router>
      <div className="app">
        <div className="container">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
        <nav>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="material-icons">search</i>
            <span>חיפוש</span>
          </NavLink>
          <NavLink to="/admin" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="material-icons">admin_panel_settings</i>
            <span>ניהול</span>
          </NavLink>
        </nav>
      </div>
    </Router>
  );
}

export default App;