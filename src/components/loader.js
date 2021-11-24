import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import anime from 'animejs';
import styled from 'styled-components';
import { IconLoader } from '@components/icons';

const StyledLoader = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bg);
  z-index: 99;

  .logo-wrapper {
    width: max-content;
    max-width: 100px;
    transition: var(--transition);
    opacity: ${props => (props.isMounted ? 1 : 0)};
    svg {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      fill: none;
      user-select: none;
      #B {
        opacity: 0;
      }
    }
  }
`;

const Loader = ({ finishLoading }) => {
  const [isMounted, setIsMounted] = useState(false);

  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });

      

    loader
      .add({
        targets: '#logo #circle',
        delay: 100,
        duration: 400,
        easing: 'easeInOutQuart',
        strokeDashoffset: [anime.setDashoffset, 0],
      })
      .add({
        targets: '#logo #play',
        delay: 0,
        duration: 500,
        easing: 'easeInOutQuart',
        strokeDashoffset: [anime.setDashoffset, 0],
        fill :'#FFFFFF'
      }, '-=400')
      .add({
        targets: '#logo #leftplay',
        delay: 100,
        duration: 100,
        easing: 'easeInOutQuart',
        opacity: 1
      })
      .add({
        targets: '#logo #rightplay',
        delay: 100,
        duration: 100,
        easing: 'easeInOutQuart',
        opacity: 1
      })
      .add({
        targets: '#logo #play',
        delay: 200,
        duration: 200,
        easing: 'easeInOutQuart',
        scale:0.6
      })
      .add({
        targets: '#logo #rightplay',
        delay: 0,
        duration: 100,
        easing: 'easeInOutQuart',
        scale:0.6
      }, '-=100')
      .add({
        targets: '#logo #leftplay',
        delay: 0,
        duration: 100,
        easing: 'easeInOutQuart',
        scale:0.6
      }, '-=100')
      .add({
        targets: '#logo #play',
        delay: 0,
        duration: 100,
        easing: 'easeInOutQuart',
        opacity: 0
      }, '-=100')

      .add({
        targets: '#logo #leftplay',
        points: [
          { value: "   29.54 23.53 29.54 62.95  40.83 62.97  40.88 23.53 29.54 23.53 " }
        ],
        easing: 'easeOutQuad',
        delay: 0,
        scale: 1,
        duration: 100,
        stroke: "#161616",
        fill : "#161616"
      })
      .add({
        targets: '#logo #rightplay',
        points: [
          { value: "50.12 23.53 61.46 23.53 61.4 62.97 50.12 62.95 50.12 23.53" }
        ],
        easing: 'easeOutQuad',
        delay: 0,
        scale: 1,
        duration: 100,
        
        stroke: "#161616",
        fill : "#161616"
      }, '-=100')

      .add({
        targets: '#logo #circle',
        
        easing: 'easeOutQuad',
        delay: 0,
        duration: 100,
        
        stroke: "#FFFFFF",
        fill : "#FFFFFF"
      }, '-=100')
      

      .add({
        targets: '#logo',
        delay: 300,
        duration: 300,
        easing: 'easeInOutQuart',
        opacity: 0,
        scale: 0.1,
      },'-=100')
      .add({
        targets: '.loader',
        duration: 200,
        easing: 'easeInOutQuart',
        opacity: 0,
        zIndex: -1,
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    animate();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <StyledLoader className="loader" isMounted={isMounted}>
      <Helmet bodyAttributes={{ class: `hidden` }} />

      <div className="logo-wrapper">
        <IconLoader />
      </div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
