import { Route, Routes } from 'react-router-dom';
import './App.css';
import './assets/css/Pages.css';
import Login from './components/Login';
import Register from './components/Register';
import MainLayout from './layout/MainLayout';
import NavLayout from './layout/NavLayout';
import AdminsArena from './pages/AdminsArena';
import Auth from './pages/Auth';
import EditorsEstate from './pages/EditorsEstate';
import Home from './pages/Home';
import Lounge from './pages/Lounge';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';
import UsersUtopia from './pages/UsersUtopia';
import RequireAuth from './utils/auth/RequireAuth';
import roleCodes from './utils/constants/roleCodes';

function App() {

  return (
    <Routes>
      {/* Routes without Navbar - <main> layout */}
      <Route path='/' element={<MainLayout />}>
        {/* Public routes */}
        <Route path='auth' element={<Auth />} />
        <Route path='auth/login' element={<Login />} />
        <Route path='auth/register' element={<Register />} />
      </Route>

      {/* Routes with Navbar - <nav> + <main> layout */}
      <Route element={<NavLayout />}>
        <Route path='/' element={<MainLayout />}>
          {/* Public routes */}
          <Route index element={<Home />} />
          <Route path='unauthorized' element={<Unauthorized />} />
          {/* Protected routes */}
          {/* If the allowedRoles prop is not passes, no role will be authorized to access the route */}
          <Route element={<RequireAuth allowedRoles={[roleCodes.user]} />}>
            {/* <Route index element={<Home />} /> */}
            <Route path='/users-utopia' element={<UsersUtopia />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[roleCodes.editor]} />}>
            <Route path='/editors-estate' element={<EditorsEstate />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[roleCodes.admin]} />}>
            <Route path='/admins-arena' element={<AdminsArena />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[roleCodes.admin, roleCodes.editor]} />}>
            <Route path='/lounge' element={<Lounge />} />
          </Route>
          {/* Invalid routes */}
          <Route path='*' element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
