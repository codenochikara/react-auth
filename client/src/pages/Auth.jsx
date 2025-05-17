import { FaUserCheck, FaUserPlus } from "react-icons/fa6";
import Login from "../components/Login";
import Register from "../components/Register";
import Tabs from "../components/Tabs/Tabs";

const tabsConfig = [
  {
    id: 'register',
    label: (
      <>
        <FaUserPlus />
        Register
      </>
    ),
    content: <Register />
  },
  {
    id: 'login',
    label: (
      <>
        <FaUserCheck />
        Login
      </>
    ),
    content: <Login />
  }
];

const Auth = () => {
  return (
    <>
      <Tabs tabs={tabsConfig} />
    </>
  )
}

export default Auth;
