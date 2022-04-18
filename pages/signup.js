import React, { useState } from 'react';
import loginStyles from '../styles/login-signup.module.scss';
import { BiHide, BiShowAlt } from 'react-icons/bi';
import Link from 'next/link'
import Router from 'next/router'

const Signup = () => {
  const router = Router
  const [showPassword, setShowPassword] = useState(false);
  const handleRevealPasssword = () => setShowPassword(!showPassword);


  const handleSignUp = () => {
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
          <input placeholder='Name' type='text' />
        </div>
        <div className={loginStyles.inputContainer}>
          <input placeholder='Password' type={showPassword ? 'text' : 'password'} />
          {showPassword ? (
            <BiShowAlt onClick={handleRevealPasssword} />
          ) : (
            <BiHide onClick={handleRevealPasssword} />
          )}
        </div>
        <div className={loginStyles.inputContainer}>
          <input placeholder='Confirm Password' type={showPassword ? 'text' : 'password'} />
          {showPassword ? (
            <BiShowAlt onClick={handleRevealPasssword} />
          ) : (
            <BiHide onClick={handleRevealPasssword} />
          )}
        </div>

        <p style={{ color: 'transparent', userSelect: 'none' }}>placeholder</p>
        <button onClick={handleSignUp}>Sign Up</button>
      </section>

      <div className={loginStyles.signUpPanel}>
        <p>Already have an account?
          {' '}
          <Link href="/login">
            <span>Log In.</span>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup;