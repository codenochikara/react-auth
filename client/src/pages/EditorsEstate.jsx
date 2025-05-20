import { FaUserPen } from 'react-icons/fa6';
import RoleBadge from '../components/RoleBadge';

const EditorsEstate = () => {
  return (
    <section className='page-section flex-column-center gap-1rem'>
      <div className='flex-center gap-1rem flex-wrap'>
        <h2>Editors' Estate</h2>
        <RoleBadge role='editor'>
          <FaUserPen />
          EDITOR
        </RoleBadge>
      </div>
      <p>Estate restricted to Editors only!</p>
    </section>
  )
}

export default EditorsEstate;
