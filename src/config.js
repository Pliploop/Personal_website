module.exports = {
  email: 'jul.guinot@gmail.com',

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/pliploop',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/julien-guinot/',
    },
    {
      name: 'Email',
      url: `mailto:jul.guinot@gmail.com`,
    },
  ],

  navLinks: [
    
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Experience',
      url: '/#jobs',
    },
    {
      name: 'Projects',
      url: '/#projects',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  colors: {
    bg : '#161616',
    green: '#1DB954',
    lightgrey: '#A0A0A0',
    darkgray: '#7C7C7C',
    logogray : '#494949'
  },

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
