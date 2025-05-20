import { FaUserShield } from 'react-icons/fa6';
import RoleBadge from '../components/RoleBadge';

const AdminsArena = () => {
  return (
    <section className='page-section flex-column-center gap-1rem'>
      <div className='flex-center gap-1rem flex-wrap'>
        <h2>Admins' Arena</h2>
        <RoleBadge role='admin'>
          <FaUserShield />
          ADMIN
        </RoleBadge>
      </div>
      <p>Arena restricted to Admins only!</p>
    </section>
  )
}

export default AdminsArena;
