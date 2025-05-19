import { FaArrowLeft, FaUserSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import RoleBadge from "../components/RoleBadge";

const Unauthorized = () => {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);

  return (
    <section className='page-section flex-column-center gap-1rem'>
      <div className='flex-center gap-1rem'>
        <h2>Unauthorized</h2>
        <RoleBadge role='other'>
          <FaUserSlash />
        </RoleBadge>
      </div>
      <p>You're not authorized to access this page.</p>
      <button className="flex-center gap-10px" onClick={handleGoBack}>
        <FaArrowLeft />
        Go Back
      </button>
    </section>
  )
}

export default Unauthorized;