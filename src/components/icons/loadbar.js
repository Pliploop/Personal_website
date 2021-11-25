import React from 'react';

const LoadBar = () => (
  <svg id="bar" xmlns="http://www.w3.org/2000/svg" viewBox="-5 0 350 10">
    <title></title>


    <g>
      <g transform="translate(0.000000, 0.000000)">
      <rect id='bar-container' x="1" y="1" width="335.32" height="3" rx="2.72"/>
      <rect id='progress' x="1" y="1" width="10.78" height="3" rx="2.72" opacity='0'/>
      </g>
      
    </g>

  </svg>
);

export default LoadBar;
