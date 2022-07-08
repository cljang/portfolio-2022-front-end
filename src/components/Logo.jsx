import { useState, useEffect, useRef } from "react"

function Logo() {

  const [faceStyle, setFaceStyle] = useState({});
  const isHovered = useRef(false);
  const logoRef = useRef()

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isHovered.current) {

        requestAnimationFrame(() => {
          const boundingBox = logoRef.current.getBoundingClientRect();
          const xNormalized = (e.x - boundingBox.x)/(boundingBox.width/2) - 1;
          const yNormalized = (e.y - boundingBox.y)/(boundingBox.height/2) - 1;
          const factor = 8;
          
          setFaceStyle({
            transform: `translate(${xNormalized*factor}%, ${yNormalized*factor}%) scaleX(${100 - Math.abs(xNormalized)*factor}%) scaleY(${100 - Math.abs(yNormalized)*factor}%)`
          });

          console.log("move");
        })
      }
    };
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])
  
  const handleHover = () => {
    isHovered.current = true;
  }
  
  const stopHover = () => {
    isHovered.current = false;
    requestAnimationFrame(() => {
      setFaceStyle({});
    })
  }

  return (
    <svg 
      ref={logoRef} 
      onMouseEnter={handleHover}
      onMouseLeave={stopHover}
      id="logo" 
      className="site-logo" 
      data-name="logo" 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 449 349" 
      aria-hidden
    >
      <defs></defs>
      <path className='logo-c' d="M183.53,354.71a88.89,88.89,0,0,1-77-88.09V253.39a96.89,96.89,0,0,1,96.89-96.89h57.15a8,8,0,0,0,7.52-5.27l21.47-59A8,8,0,0,0,282,81.5H198.74A167.25,167.25,0,0,0,31.5,248.74v22.53A159.28,159.28,0,0,0,160.23,427.58a8,8,0,0,0,9.11-5.12l20.77-57.06A8,8,0,0,0,183.53,354.71Z" transform="translate(-31.5 -81.5)"/>
      <path className='logo-j' d="M472.49,81.5H351.19a8,8,0,0,0-7.52,5.27l-21.47,59a8,8,0,0,0,7.52,10.75h67.77a8,8,0,0,1,8,8v94.1a96.89,96.89,0,0,1-96.89,96.89H251.46a8,8,0,0,0-7.52,5.27l-21.47,59A8,8,0,0,0,230,430.5h83.27A167.25,167.25,0,0,0,480.5,263.26V89.51A8,8,0,0,0,472.49,81.5Z" transform="translate(-31.5 -81.5)"/>
      <g className="logo-face" style={faceStyle}>
        <path className='logo-mouth' d="M256,321a42,42,0,0,0,40.64-31.37,8.5,8.5,0,0,0-16.43-4.38,25,25,0,0,1-48.42,0,8.5,8.5,0,0,0-16.43,4.38A42,42,0,0,0,256,321Z" transform="translate(-31.5 -81.5)"/>
        <circle className='logo-eye-right' cx="302.5" cy="159.5" r="27"/>
        <circle className='logo-eye-left' cx="147.5" cy="159.5" r="27"/>
      </g>
    </svg>
  )
}

export default Logo