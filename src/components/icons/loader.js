import React from 'react';

const IconLoader = () => (
  <svg id="logo" xmlns="http://www.w3.org/2000/svg" viewBox="-5 0 100 100">
    <title>Loader Logo</title>

    <g>
      <g transform="translate(0.000000, 5.000000)">
        <circle id="circle" cx="45.5" cy="45.5" r="44.5" stroke="#FFFFFF" strokeWidth="3" transform-origin='center'/>
        <polygon
          id="leftplay"
          stroke="#FFFFFF"
          strokeWidth="2"
          points = "32.69 22.81 32.69 65.1 49.9 55.16 48.79 32.11 32.69 22.81"
          fill="#FFFFFF"
          transform-origin='center'
          opacity = '0'
        />
        <polygon
          id="rightplay"
          stroke="#FFFFFF"
          strokeWidth="2"
          points="48.79 32.11 69.31 43.96 53.27 53.22 49.9 55.16 48.79 32.11"
          fill="#FFFFFF"
          transform-origin='center'
          opacity = '0'
          
        />
        <polygon
          id="play"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform-origin='center'
          points="69.31 43.96 32.69 22.81 32.69 65.1 69.31 43.96"/>
      </g>
    </g>
  </svg>
);

export default IconLoader;
