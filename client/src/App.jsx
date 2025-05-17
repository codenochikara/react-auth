// import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './components/Register';
import AdminsArena from './pages/AdminsArena';
import Auth from './pages/Auth';
import EditorsEstate from './pages/EditorsEstate';
import Home from './pages/Home';
import Lounge from './pages/Lounge';
import UsersUtopia from './pages/UsersUtopia';

function App() {

  return (
    <>
      <header>
        <nav className="navbar flex-align-center flex-wrap">
          <Navbar />
        </nav>
      </header>
      <main className='flex-column-center gap-5rem'>
        <Auth />
        <Register />
        <Login />
        <Home />
        <UsersUtopia />
        <EditorsEstate />
        <AdminsArena />
        <Lounge />
      </main>
    </>
  );
}

export default App;
