'use client'; // Client Component for DOM manipulation
import { useState, useEffect } from 'react';

export default function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove); // Clean up on unmount
    };
  }, []);

  const backgroundStyle = {
    backgroundPosition: `${mousePosition.x / 20}px ${mousePosition.y / 20}px`, // Adjust divisor for sensitivity
    // Or for a more "parallax" effect (background moves slower):
    // backgroundPosition: `${mousePosition.x / 50}px ${mousePosition.y / 50}px`,
  };

  return (
    <div className="animated-background" style={backgroundStyle} data-testid='animated-background'>
      {/* You can add content here if needed */}
    </div>
  );
}
