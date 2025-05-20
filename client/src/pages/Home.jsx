import { FaHouse } from "react-icons/fa6";
import RoleBadge from "../components/RoleBadge";

const Home = () => {
  return (
    <section className='page-section flex-column-center gap-1rem'>
      <div className='flex-center gap-1rem flex-wrap'>
        <h2>Home</h2>
        <RoleBadge role='home' icon={<FaHouse />}>
          HOME
        </RoleBadge>
      </div>
      <p>Home sweet home! ♥️</p>
    </section>
  )
}

export default Home;
