import { useContext, useEffect, useRef, useState } from 'react';
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';
import { LOGIN_URL } from '../utils/constants/apiUrls';

const Login = () => {
  const { setAuth } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const usernameRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [username, password]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // If button enabled with JS hack - not needed since both are required fields and error handling is implemented in the API call
    /* if (!username || !password) {
      setErrMsg(
        <>
          <FaCircleXmark />
          <strong>Invalid entry!</strong>
        </>
      );
      return;
    } */

    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      // console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken
      const roles = response?.data?.roles
      setAuth({ username, password, roles, accessToken });

      // Clear the input fields
      setUsername('');
      setPassword('');
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Username and password are required');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized - Invalid credentials!');
      } else {
        setErrMsg('Login Failed!')
      }
      errRef.current.focus();
    }
  }

  return (
    <>
      {success ? (
        <section>
          <h1>Successfully logged in!</h1>
          <p>
            <a href="#">Home</a>
          </p>
        </section>
      ) : (
        <section className='form-section'>
          <p ref={errRef} className={errMsg ? 'errmsg flex-align-center' : 'offscreen'} aria-live='assertive' role='alert'>{errMsg}</p>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username-login">Username:</label>
            <input
              type="text"
              id="username-login"
              name="username"
              ref={usernameRef}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="on"
            />

            <label htmlFor="password-login">Password:</label>
            <input
              type="password"
              id="password-login"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete='new-password'
            />

            <button
              className='register-button'
              disabled={!username || !password}
            >
              Log In
            </button>
          </form>
          <p>
            Not registered?<br />
            <span className="line">
              <a href="#">Sign Up</a>
            </span>
          </p>
        </section >
      )}
    </>
  );
}

export default Login;
