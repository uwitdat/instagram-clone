import React, { useEffect } from 'react';
import overlayStyles from '../styles/overlay.module.scss';

const Overlay = ({ isShowing, children, currentTopPosition, height }) => {

  useEffect(() => {
    if (isShowing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [isShowing])

  return (
    <div className={isShowing ? overlayStyles.showOverlay : overlayStyles.overlay} style={{ top: `${currentTopPosition}px`, height: height }}>
      {children}
    </div>
  )
}

export default Overlay