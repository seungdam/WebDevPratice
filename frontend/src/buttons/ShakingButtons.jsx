import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';


// create component = create class
// 
function ShakingButton(props) // props = parameter, props contain default
{
  const buttonRef = useRef(null);
  const {contextSafe} = useGSAP({scope:buttonRef}) // define animation
  const tlRef = useRef(null); //  save time line

  const hEnter = contextSafe(() => { // hoving enter
    if (tlRef.current)
    { 
        tlRef.current.kill();
    }

    tlRef.current = gsap.timeline();
    tlRef.current.to(buttonRef.current, { 
        scale: props.scale, 
        duration: 0.2, 
        ease: "power3.out" 
        }).to(buttonRef.current, {
            rotation: `random(-${props.intensity}, ${props.intensity})`,
            duration: 0.05,
            repeat: -1,
            yoyo: true,
            ease: "none"
            }, "<"); // start with previous anim
    });

    const hLeave = contextSafe(() => {
      if (tlRef.current) tlRef.current.kill();
      gsap.to(buttonRef.current, { 
      scale: 1, 
      rotation: 0, 
      duration: 0.3, 
      ease: "power3.inOut" });
    });
  
  return (    
      <button 
        ref={buttonRef} 
        onMouseEnter={hEnter} onMouseLeave={hLeave} 
        onClick={props.onTrigger}
        style={styles.button}
      >
      
      </button>
)};

export default ShakingButton;

// Button styles
const styles = {
  button: {
    position: 'relative',          // 그대로 유지
    width: '120px',
    height: '120px',
    border: 'none',
    borderRadius: '50%',
    backgroundColor: '#ff6b6b',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
    outline: 'none',
    zIndex: 1                      // Layout보다 위에 (버튼이 안 가려지게)
  },

  icon: {
    width: '60px',
    height: '60px',
    pointerEvents: 'none',
    filter: 'brightness(0) invert(1)'
  }
};