import { FaUser, FaUserPen, FaUserShield } from "react-icons/fa6";

const rolesMap = {
  1106: {
    'role': 'admin',
    'icon': <FaUserShield />
  },
  2002: {
    'role': 'editor',
    'icon': <FaUserPen />
  },
  2309: {
    'role': 'user',
    'icon': <FaUser />
  }
}

export default rolesMap;
