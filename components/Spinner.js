import React from 'react'
import spinnerStyles from '../styles/spinner.module.scss';

export const Spinner = () => {
  return (
    <div className={spinnerStyles.container}>
      <div className={spinnerStyles.ldsRing}><div></div><div></div><div></div><div></div></div>
    </div>

  )
}
