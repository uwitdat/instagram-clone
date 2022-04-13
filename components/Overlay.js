import React from 'react'
import overlayStyles from '../styles/overlay.module.scss';

const Overlay = ({ isShowing, children, currentTopPosition }) => {
  return (
    <div className={isShowing ? overlayStyles.showOverlay : overlayStyles.overlay} style={{ top: `${currentTopPosition}px` }}>
      {children}
    </div>
  )
}

export default Overlay