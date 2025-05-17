import { FaReact, FaRegCircleUser } from 'react-icons/fa6';
import '../assets/css/Navbar.css';

const Navbar = () => {
  return (
    <>
      <div className='navbar-logo flex-center gap-10px'>
        <FaReact style={{ color: '#646cff', fontSize: '2rem', strokeWidth: '8px' }} />
        <h1 className="navbar-title">React Auth</h1>
      </div>
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#home">Users' Utopia</a></li>
        <li><a href="#services">Editors' Estate</a></li>
        <li><a href="#contact">Admins' Arena</a></li>
        <li><a href="#about">Lounge</a></li>
      </ul>
      <div className="navbar-auth">
        <button className="navbar-auth-button flex-center gap-10px">
          <FaRegCircleUser />
          Login/Register
        </button>
      </div>
    </>
  );
};

export default Navbar;