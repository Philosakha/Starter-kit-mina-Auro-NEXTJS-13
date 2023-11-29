import React from 'react';

const Hero = () => {
  const heroStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#000000', // Set the background color as per your design
  };

  const textStyle = {
    fontSize: '3em', // Adjust the font size as needed
    fontWeight: 'bold',
    color: 'f0f0f0', // Set the text color
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Add a subtle text shadow
  };

  return (
    <div style={heroStyle}>
      <span style={textStyle}>MAYA ON NEXT JS 13</span>
    </div>
  );
};

export default Hero;
