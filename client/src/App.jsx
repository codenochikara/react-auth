// import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';

function App() {

  return (
    <>
      <main className='flex-column-center-gap'>
        <Register />
        <Login />
      </main>
    </>
  );
}

export default App;
