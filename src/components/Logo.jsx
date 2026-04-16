import React from 'react';

const Logo = () => (
  <svg viewBox="0 0 200 60" className="logo-svg" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(5, 5)">
      <path d="M 25 5 A 20 20 0 1 0 42 15" fill="none" stroke="#005EAD" strokeWidth="3" strokeLinecap="round" />
      <path d="M 25 45 A 20 20 0 0 0 42 35" fill="none" stroke="#E3BD42" strokeWidth="3" strokeLinecap="round" />
      <path d="M28 16 C 18 16, 14 22, 14 30 C 14 38, 18 40, 26 40 L 26 30 L 20 30" fill="none" stroke="#005EAD" strokeWidth="3" strokeLinecap="round" />
      <path d="M 22 18 L 30 38 L 38 18" fill="none" stroke="#E3BD42" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <text x="60" y="32" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="20">
      <tspan fill="#E3BD42">GOLDEN</tspan>
    </text>
    <text x="60" y="52" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="20" fill="#005EAD">
      VIT
    </text>
  </svg>
);

export default Logo;
