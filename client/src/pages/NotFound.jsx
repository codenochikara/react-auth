import { FaHeartCrack } from "react-icons/fa6"
import RoleBadge from "../components/RoleBadge"

const NotFound = () => {
  return (
    <section className='page-section flex-column-center gap-1rem'>
      <div className='flex-center gap-1rem flex-wrap'>
        <h2>Not Found</h2>
        <RoleBadge role='other'>
          <FaHeartCrack />
        </RoleBadge>
      </div>
      <p>The page you're looking for does not exist.</p>
    </section>
  )
}

export default NotFound