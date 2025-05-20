import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const NavLayout = () => {
  return (
    <>
      <header>
        <nav className="navbar flex-align-center gap-1rem flex-wrap">
          <Navbar />
        </nav>
      </header>
      <Outlet />
    </>
  )
}

export default NavLayout;