import { useState } from 'react';
import { FaBars, FaHouse, FaReact, FaRegCircleUser, FaUser, FaUserPen, FaUserShield, FaUserXmark, FaXmark } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/Navbar.css';
import useAuth from '../hooks/useAuth';
import rolesMap from '../utils/constants/rolesMap';
import RoleBadge from './RoleBadge';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLoginRegister = () => {
    navigate('/auth')
  }

  const handleLogout = () => {
    setAuth({});
    navigate('/auth/login')
  }

  const renderUserRoles = (roles = []) => {
    return roles.map((roleCode, index) => {
      // Destructuring the role object retrieved from the rolesMap using the corresponding roleCode from BE
      // Fallback {} provided if no matching role object found - roleCode is invalid/unknown
      const { role, icon } = rolesMap[roleCode] || {};

      // Early return if role is undefined - skip rendering
      // if (!role) return null; // Or return;

      // Alternatively, use a role ternary/&& check with the component to be rendered - better approach to avoid unnecessary rendering
      // Optional chaining while using the constants also works

      // const roleName = rolesMap[role].role;
      /* let roleIcon = null;

        switch (roleName) {
          case 'admin':
            roleIcon = <FaUserShield />
            break;
          case 'editor':
            roleIcon = <FaUserPen />
            break;
          case 'user':
            roleIcon = <FaUser />
            break;

          default:
            break;
        } */
      return role ? (
        <RoleBadge key={index} role={role} icon={icon}>
          {role.toUpperCase()}
        </RoleBadge>
      ) : null
    });
  }

  const isActiveLink = (path) => location.pathname === path;

  return (
    <>
      <div className='navbar-menu-logo-container flex-center gap-10px'>
        <button className='navbar-menu-button flex-align-center' onClick={() => setShowMenu(prev => !prev)}>
          {showMenu ? <FaXmark /> : <FaBars />}
        </button>
        <FaReact style={{ color: '#646cff', fontSize: '2rem', strokeWidth: '8px' }} />
        <h1 className="navbar-title">React Auth</h1>
      </div>
      <ul className={!showMenu ? 'navbar-links' : 'menu-links'}>
        <li className={`nav-link-item ${isActiveLink('/') ? 'active' : ''}`}>
          <Link to='/'>Home</Link>
          <RoleBadge role='home' icon={<FaHouse />} />
        </li>
        <li className={`nav-link-item ${isActiveLink('/users-utopia') ? 'active' : ''}`}>
          <Link to='/users-utopia'>Users' Utopia</Link>
          <RoleBadge role='user' icon={<FaUser />} />
        </li>
        {auth?.username && auth?.accessToken &&
          <>
            <li className={`nav-link-item ${isActiveLink('/editors-estate') ? 'active' : ''}`}>
              <Link to='/editors-estate'>Editors' Estate</Link>
              <RoleBadge role='editor' icon={<FaUserPen />} />
            </li>
            <li className={`nav-link-item ${isActiveLink('/admins-arena') ? 'active' : ''}`}>
              <Link to='/admins-arena'>Admins' Arena</Link>
              <RoleBadge role='admin' icon={<FaUserShield />} />
            </li>
            <li className={`nav-link-item ${isActiveLink('/lounge') ? 'active' : ''}`}>
              <Link to='/lounge'>Lounge</Link>
              <RoleBadge role='admin' icon={<FaUserShield />} />
              <RoleBadge role='editor' icon={<FaUserPen />} />
            </li>
          </>}
      </ul>
      <div className="navbar-auth flex-center gap-1rem flex-wrap">
        {!auth?.username ? (
          <button className="navbar-auth-button flex-center gap-10px" onClick={handleLoginRegister}>
            <FaRegCircleUser />
            Login/Register
          </button>
        ) : (
          <>
            <span className='flex-center'>
              <FaRegCircleUser style={{ color: '#747bff' }} aria-label='Signed in as' />
              &nbsp;
              <strong>{auth.username}</strong>
            </span>
            {renderUserRoles(auth.roles)}
            <button className="navbar-auth-button flex-center gap-10px" onClick={handleLogout} title='Logout' aria-label='Logout'>
              <FaUserXmark aria-hidden='true' />
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
