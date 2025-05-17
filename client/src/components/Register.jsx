import { useEffect, useRef, useState } from 'react';
import { FaCircleCheck, FaCircleInfo, FaCircleXmark } from "react-icons/fa6";
import axios from '../api/axios';
import { REGISTER_URL } from '../utils/constants/apiUrls';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const [user, setUser] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const userRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    // console.log(userRef.current);
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg('');
  }, [user, password, matchPassword]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // If button is enabled with HTML inspect
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg(
        <>
          <FaCircleXmark />
          <strong>Invalid entry!</strong>
        </>
      );
      return;
    }
    // setSuccess(true);
    try {
      const res = await axios.post(REGISTER_URL,
        JSON.stringify({ username: user, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(JSON.stringify(res.data));
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed')
      }
      errRef.current.focus();
    }
  }

  return (
    <>
      {success ? (
        <section>
          <h1>Successfully registered!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <section className='form-section'>
          <p ref={errRef} className={errMsg ? 'errmsg flex-align-center' : 'offscreen'} aria-live='assertive' role='alert'>{errMsg}</p>
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username-register">
              Username:
              <FaCircleCheck className={validUsername ? "valid" : "hide"} />
              <FaCircleXmark className={validUsername || !user ? "hide" : "invalid"} />
            </label>
            <input
              type="text"
              id="username-register"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              aria-invalid={validUsername ? "false" : "true"}
              aria-describedby="usernamenote"
              onFocus={() => setUsernameFocus(true)}
              onBlur={() => setUsernameFocus(false)}
            />
            <p id="usernamenote" className={usernameFocus && user && !validUsername ? "instructions" : "offscreen"}>
              <FaCircleInfo />
              4 to 24 characters.<br />
              Must begin with a letter.<br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            <label htmlFor="password-register">
              Password:
              <FaCircleCheck className={validPassword ? "valid" : "hide"} />
              <FaCircleXmark className={validPassword || !password ? "hide" : "invalid"} />
            </label>
            <input
              type="password"
              id="password-register"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              aria-invalid={validPassword ? "false" : "true"}
              aria-describedby="passwordnote"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              autoComplete='new-password'
            />
            <p id="passwordnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
              <FaCircleInfo />
              8 to 24 characters.<br />
              Must include uppercase and lowercase letters, a number and a special character.<br />
              Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
            </p>

            <label htmlFor="confirm-password">
              Confirm Password:
              <FaCircleCheck className={validMatch && matchPassword ? "valid" : "hide"} />
              <FaCircleXmark className={validMatch || !matchPassword ? "hide" : "invalid"} />
            </label>
            <input
              type="password"
              id="confirm-password"
              onChange={(e) => setMatchPassword(e.target.value)}
              value={matchPassword}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              autoComplete='new-password'
            />
            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
              <FaCircleInfo />
              Must match with your password.
            </p>

            <button
              className='register-button'
              disabled={!validUsername || !validPassword || !validMatch ? true : false}
            >
              Sign Up
            </button>
          </form>
          <p>
            Already registered?<br />
            <span className="line">
              <a href="#">Sign In</a>
            </span>
          </p>
        </section >
      )}
    </>
  );
}

// Named export
/* export const AnotherComponent = () => {
  return (
    <>
      Another component
    </>
  );
} */

export default Register;
// export { Register, AnotherComponent }; // Named export - for when you want to export multiple components in the same file