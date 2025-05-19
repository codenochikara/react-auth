import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <main className='flex-column-center gap-5rem'>
      <Outlet />
    </main>
  )
}

export default MainLayout;