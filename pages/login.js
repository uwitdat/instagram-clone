import React, { useState } from 'react';
import loginStyles from '../styles/login-signup.module.scss';
import { BiHide, BiShowAlt } from 'react-icons/bi';
import Link from 'next/link'
import Router from 'next/router';
import { useMutation } from '@apollo/client';
import { LOGIN_USER_MUTATION } from '../utils/mutations';
import { setCookie } from '../utils/functions';

const Login = () => {
  const router = Router;

  const [loginValues, setLoginValues] = useState({
    userName: '',
    password: ''
  });

  const [loginError, setLoginError] = useState('')

  const handleSetLoginValues = (e) => {
    const { name, value } = e.target;
    setLoginValues({
      ...loginValues,
      [name]: value
    });
  }

  const [loginUser] = useMutation(LOGIN_USER_MUTATION);
  const [showPassword, setShowPassword] = useState(false);
  const handleRevealPasssword = () => setShowPassword(!showPassword);

  const handleLogIn = async () => {
    const { userName, password } = loginValues;
    try {
      const { data } = await loginUser({
        variables: {
          userName,
          password
        }
      });
      if (data.loginUser) {
        setCookie('JWT', data.loginUser, 1)
        router.push('/')
      }
    } catch (err) {
      console.log(err)
      setLoginError(err.message)
    }
  }

  return (
    <div className={loginStyles.container}>
      <section>
        <h1>Instagram</h1>

        <div className={loginStyles.inputContainer}>
          <input onChange={(e) => handleSetLoginValues(e)} name='userName' value={loginValues.userName} placeholder='Username' type='text' />
        </div>
        <div className={loginStyles.inputContainer}>
          <input onChange={(e) => handleSetLoginValues(e)} name='password' value={loginValues.password} placeholder='Password' type={showPassword ? 'text' : 'password'} />
          {showPassword ? (
            <BiShowAlt onClick={handleRevealPasssword} />
          ) : (
            <BiHide onClick={handleRevealPasssword} />
          )}
        </div>

        <p>Forgot Password?</p>
        <button onClick={handleLogIn}>Log In</button>
      </section>
      <p className={loginStyles.loginError}>{loginError}</p>

      <div className={loginStyles.signUpPanel}>
        <p>Don't have an account?
          {' '}
          <Link href="/signup">
            <span>Sign Up.</span>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login;
