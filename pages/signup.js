import React, { useState } from 'react';
import loginStyles from '../styles/login-signup.module.scss';
import { BiHide, BiShowAlt } from 'react-icons/bi';
import Link from 'next/link';
import Router from 'next/router';
import { CREATE_USER_MUTATION } from '../utils/mutations';
import { useMutation } from '@apollo/client';

const Signup = () => {
  const router = Router;
  const [showPassword, setShowPassword] = useState(false);
  const handleRevealPasssword = () => setShowPassword(!showPassword);

  const [signupError, setSignupError] = useState('');

  const [signupValues, setSignupValues] = useState({
    userName: '',
    password: '',
    passwordConfirm: ''
  });

  const handleSetSignupValues = (e) => {
    const { name, value } = e.target;
    setSignupValues({
      ...signupValues,
      [name]: value
    });
  }

  const [createAndRegisterUser] = useMutation(CREATE_USER_MUTATION);


  const handleSignUp = async () => {
    const { userName, password, passwordConfirm } = signupValues;

    if (password !== passwordConfirm) {
      setSignupError('Passwords do not match.');
    } else {
      try {
        const { data } = await createAndRegisterUser({
          variables: { createUserInput: { userName, password } }
        })
        console.log('data', data)
        if (data.createAndRegisterUser) {
          router.push('/login');
        }
      } catch (err) {
        setSignupError(err.message);
      }
    }
  }

  return (
    <div className={loginStyles.container}>
      <section>
        <h1>Instagram</h1>

        <div className={loginStyles.inputContainer}>
          <input name='userName' value={signupValues.userName} onChange={(e) => handleSetSignupValues(e)} placeholder='Username' type='text' />
        </div>
        <div className={loginStyles.inputContainer}>
          <input name='password' value={signupValues.password} onChange={(e) => handleSetSignupValues(e)} placeholder='Password' type={showPassword ? 'text' : 'password'} />
          {showPassword ? (
            <BiShowAlt onClick={handleRevealPasssword} />
          ) : (
            <BiHide onClick={handleRevealPasssword} />
          )}
        </div>
        <div className={loginStyles.inputContainer}>
          <input name='passwordConfirm' value={signupValues.passwordConfirm} onChange={(e) => handleSetSignupValues(e)} placeholder='Confirm Password' type={showPassword ? 'text' : 'password'} />
          {showPassword ? (
            <BiShowAlt onClick={handleRevealPasssword} />
          ) : (
            <BiHide onClick={handleRevealPasssword} />
          )}
        </div>

        <p style={{ color: 'transparent', userSelect: 'none' }}>placeholder</p>
        <button onClick={handleSignUp}>Sign Up</button>
      </section>

      <p>{signupError}</p>

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