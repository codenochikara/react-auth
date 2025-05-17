import { FaUser } from 'react-icons/fa6';
import RoleBadge from '../components/RoleBadge';

const UsersUtopia = () => {
  return (
    <section className='page-section flex-column-center gap-1rem'>
      <div className='flex-center gap-1rem'>
        <h2>Users' Utopia</h2>
        <RoleBadge role='user'>
          <FaUser />
          USER
        </RoleBadge>
      </div>
      <p>A Utopia for all users!</p>
    </section>
  )
}

export default UsersUtopia;
