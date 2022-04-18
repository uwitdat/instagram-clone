import React, { useState } from 'react';
import loginStyles from '../styles/login-signup.module.scss';
import { BiHide, BiShowAlt } from 'react-icons/bi';
import Link from 'next/link'
import Router from 'next/router'

const Login = () => {
  const router = Router

  const [showPassword, setShowPassword] = useState(false);

  const handleRevealPasssword = () => setShowPassword(!showPassword);

  const handleLogIn = () => {
    router.push('/home')
  }

  return (
    <div className={loginStyles.container}>
      <section>
        <h1>Instagram</h1>

        <div className={loginStyles.inputContainer}>
          <input placeholder='Username' type='text' />
        </div>
        <div className={loginStyles.inputContainer}>
          <input placeholder='Password' type={showPassword ? 'text' : 'password'} />
          {showPassword ? (
            <BiShowAlt onClick={handleRevealPasssword} />
          ) : (
            <BiHide onClick={handleRevealPasssword} />
          )}
        </div>

        <p>Forgot Password?</p>
        <button onClick={handleLogIn}>Log In</button>
      </section>

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