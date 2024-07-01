import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [opacity, setOpacity] = useState(1);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    // Adjust the divisor to make it fade out faster
    const fadeFactor = 0.2; // Increase this value to make it fade out faster
    const newOpacity = 1 - (scrollTop / (windowHeight * fadeFactor));
    setOpacity(Math.max(newOpacity, 0));
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='w-full h-screen flex items-center z-3 relative justify-center bg-bg1 bg-fixed'>
      <div className='w-full flex flex-col h-1/3 items-center justify-center z-2 bg-white' style={{ opacity }}>
        <p className="text-9xl text-clip">VDB</p>
        <p className="text-2xl text-clip">UPCYCLING FASHION DESIGN</p>
      </div>
      
    </div>
  );
}

export default Hero;
