import { FaUserPen, FaUserShield } from "react-icons/fa6";
import RoleBadge from "../components/RoleBadge";

const Lounge = () => {
  return (
    <section className='page-section flex-column-center gap-1rem'>
      <div className='flex-center gap-1rem flex-wrap'>
        <h2>Lounge</h2>
        <RoleBadge role='admin'>
          <FaUserShield />
          ADMIN
        </RoleBadge>
        <RoleBadge role='editor'>
          <FaUserPen />
          EDITOR
        </RoleBadge>
      </div>
      <p>Where admins and editors hang out...</p>
    </section>
  )
}

export default Lounge;
