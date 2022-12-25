import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import anime from 'animejs';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { IconLoader, LoadBar, Heart, SkipLeft, SkipRight } from '@components/icons';

const musictime = Math.floor(Math.random() * (180 - 240) + 180);
const minutes = Math.floor(musictime / 60);
const seconds = ('0' + (musictime % 60)).slice(-2);
const maxreplies = 55;

var Liked = [];
for (var i = 0; i < maxreplies; i++) {
  Liked.push(false);
}

var replyindex = 1;

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

  .above-bar {
    width: 460px;
    margin: auto;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;

    @media (max-width: 768px) {
      width: 300px;
    }

    .names {
      display: flex;
      flex-direction: column;
      .song {
        font-weight: bold;
        color: var(--white);
      }
      .artist {
        color: var(--darkgrey);
        &:hover {
          color: var(--green);
        }
      }
    }

    .like-button {
      width: 14%;
      height: 20%;
      margin-left: auto;
      margin-right: -30px;
      padding-top: 10px;
      padding-bottom: 0px;

      @media (max-width: 768px) {
        width: 25%;
      }

      svg {
        stroke: ${props => (props.isLiked ? 'var(--green)' : 'var(--darkgrey)')};
        stroke-width: 5px;
        fill: ${props => (props.isLiked ? 'var(--green)' : 'none')};
        transition: var(--transition-liked);
        user-select: none;
        width: 35%;
        height: 35%;
        &:hover {
          cursor: pointer;
          stroke: ${props => (props.isLiked ? 'var(--green)' : 'var(--white)')};
          &:active {
            fill: var(--green);
            stroke: var(--green);
          }
        }
      }
    }
  }

  .below_bar {
    margin: auto;
    width: max-content;
    display: flex;
    @media (max-width: 768px) {
      margin-top: 10px;
    }

    .left-skip {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 170px;

      @media (max-width: 768px) {
        width: 100px;
      }

      svg {
        margin: auto;
        width: 40%;
        height: 40%;
        fill: var(--darkgrey);
        user-select: none;
        &:hover {
          fill: var(--white);
          cursor: pointer;
        }
      }
    }

    .right-skip {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 170px;

      @media (max-width: 768px) {
        width: 100px;
      }

      svg {
        margin: auto;
        width: 40%;
        height: 40%;
        fill: var(--darkgrey);
        user-select: none;
        &:hover {
          fill: var(--white);
          cursor: pointer;
        }
      }
    }

    .logo-wrapper {
      width: max-content;
      max-width: 100px;

      margin: auto;
      transition: var(--transition);
      opacity: ${props => (props.isMounted ? 1 : 0)};
      svg {
        display: block;
        width: 60%;
        height: 60%;
        margin: 0 auto;
        fill: none;
        user-select: none;
        &:hover {
          fill: var(--verydarkgrey);
          cursor: pointer;
        }
      }
    }
  }
  .level-bar {
    display: flex;
    margin: auto;

    @media (max-width: 768px) {
      width: 300px;
    }

    .left-time {
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: smaller;
      color: var(--darkgrey);

      @media (max-width: 768px) {
        margin-right: 10px;
      }
    }

    .right-time {
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: smaller;
      color: var(--darkgrey);

      @media (max-width: 768px) {
        margin-left: 10px;
      }
    }

    .loading-bar-wrapper {
      width: 500px;
      max-width: 2000px;
      transition: var(--transition);

      svg {
        display: flex;
        position: relative;
        width: 100%;
        height: 100%;
        margin: auto;
        user-select: none;

        @media (max-width: 768px) {
          width: 150%;
        }

        #bar-container {
          fill: var(--verydarkgrey);
        }
        #progress {
          fill: var(--white);
        }
      }
    }
  }
`;

const Loader = ({ finishLoading }) => {
  const green = '#EA5A64';
  const [isMounted, setIsMounted] = useState(false);
  const [isLiked, setisLiked] = useState(false);
  var paused = true

  const playref = React.useRef(null);
  const barref = React.useRef(null);
  useEffect(() => {
    playref.current = anime
      .timeline({
        autoplay: false,
        complete: () => null,
      })
      .add({
        targets: '#logo #play',
        delay: 0,
        duration: 100,
        easing: 'easeInOutQuart',
        scale: 0.6,
        fill: {green},
        stroke: {green},
      })
      .add(
        {
          targets: '#logo #circle',
          delay: 0,
          duration: 100,
          easing: 'easeInOutQuart',
          stroke: {green},
          scale: 0.8,
        },
        '-=100',
      )
      .add(
        {
          targets: '#logo #rightplay',
          delay: 0,
          duration: 100,
          easing: 'easeInOutQuart',
          scale: 0.6,
        },
        '-=100',
      )
      .add(
        {
          targets: '#logo #leftplay',
          delay: 0,
          duration: 100,
          easing: 'easeInOutQuart',
          scale: 0.6,
        },
        '-=100',
      )
      .add(
        {
          targets: '#logo #play',
          delay: 0,
          duration: 100,
          easing: 'easeInOutQuart',
          opacity: 0,
        },
        '-=100',
      )

      .add({
        targets: '#logo #leftplay',
        points: [{ value: '   29.54 23.53 29.54 62.95  40.83 62.97  40.88 23.53 29.54 23.53 ' }],
        easing: 'easeOutQuad',
        delay: 0,
        scale: 1,
        duration: 100,
        stroke: '#161616',
        fill: '#161616',
      })
      .add(
        {
          targets: '#logo #rightplay',
          points: [{ value: '50.12 23.53 61.46 23.53 61.4 62.97 50.12 62.95 50.12 23.53' }],
          easing: 'easeOutQuad',
          delay: 0,
          scale: 1,
          duration: 100,

          stroke: '#161616',
          fill: '#161616',
        },
        '-=100',
      )

      .add(
        {
          targets: '#logo #circle',
          easing: 'easeOutQuad',
          delay: 0,
          scale: 1,
          duration: 100,
        },
        '-=100',
      )

      .add(
        {
          targets: '#logo #circle',

          easing: 'easeOutQuad',
          delay: 0,
          duration: 100,

          stroke: '#FFFFFF',
          fill: '#FFFFFF',
        },
        '-=100',
      );
  }, []);

  useEffect(() => {
    barref.current = anime
      .timeline({
        autoplay: false,
        complete: () => finishLoading(),
      })
      .add({
        targets: '#bar #progress',
        easing: 'easeOutQuad',
        delay: 0,
        duration: 50,
        opacity: 1,
      })
      .add({
        targets: '#bar #progress',
        easing: 'linear',
        delay: 0,
        duration: Math.floor(Math.random() * (1200 - 1800) + 1200),
        width: '335.32',
        update: function (anim) {
          var time_seconds = Math.round(0.01 * anim.progress * musictime);
          console.log();
          var timestring =
            Math.floor(time_seconds / 60) + ':' + ('0' + (time_seconds % 60)).slice(-2);
          document.getElementById('progresstime').innerHTML = timestring;
        },
      })
      .add(
        {
          targets: [
            '#logo',
            '#bar',
            '#heart',
            '#skipright',
            '#skipleft',
            '.song',
            '.artist',
            '.left-time',
            '.right-time',
          ],
          delay: 300,
          duration: 300,
          easing: 'easeInOutQuart',
          opacity: 0,
          scale: 0.1,
        },
        '-=100',
      )
      .add({
        targets: '.loader',
        duration: 200,
        easing: 'easeInOutQuart',
        opacity: 0,
        zIndex: -1,
      });
  }, []);


  const data = useStaticQuery(graphql`
    {
      featured: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/loader/" } }) {
        edges {
          node {
            frontmatter {
              tech
            }
            html
          }
        }
      }
    }
  `).featured.edges[0].node.frontmatter.tech;
  const minreply = 0;

  const animate = () => {
    const loader = anime.timeline({
      complete: () => null,
    });

    loader
      .add({
        targets: '#logo #circle',
        delay: 300,
        duration: 500,
        easing: 'easeInOutQuart',
        strokeDashoffset: [anime.setDashoffset, 0],
      })
      .add(
        {
          targets: '#logo #play',
          delay: 0,
          duration: 500,
          easing: 'easeInOutQuart',
          strokeDashoffset: [anime.setDashoffset, 0],
          opacity: 1,
          fill: '#FFFFFF',
        },
        '-=400',
      )
      .add({
        targets: '#logo #leftplay',
        delay: 100,
        duration: 100,
        easing: 'easeInOutQuart',
        opacity: 1,
      })
      .add({
        targets: '#logo #rightplay',
        delay: 100,
        duration: 100,
        easing: 'easeInOutQuart',
        opacity: 1,
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    animate();
    return () => clearTimeout(timeout);
  }, []);

  function setlike() {
    Liked[replyindex - 1] = !Liked[replyindex - 1];
    setisLiked(Liked[replyindex - 1]);
    console.log(Liked);
  }

  function animatelike() {
    const like = anime.timeline({
      complete: () => null,
    });
    like
      .add({
        targets: '.like-button',
        delay: 0,
        duration: 100,
        easing: 'easeInOutQuart',
        scale: 0.9,
      })
      .add({
        targets: '.like-button',
        delay: 0,
        duration: 100,
        easing: 'easeInOutQuart',
        scale: 1,
      });
    setlike();
  }

  function replies(i) {
    if (replyindex + i < minreply + 1) {
      replyindex = maxreplies;
    } else if (replyindex + i > maxreplies) {
      replyindex = minreply + 1;
    } else {
      replyindex += i;
    }

    const prevnext = anime.timeline({
      complete: () => null,
    });

    if (i == 1) {
      var targ = '.right-skip';
    } else {
      var targ = '.left-skip';
    }

    prevnext
      .add({
        targets: targ,
        delay: 0,
        duration: 100,
        easing: 'easeInOutQuart',
        scale: 0.9,
        foll: '#1DB954',
      })
      .add({
        targets: targ,
        delay: 0,
        duration: 100,
        easing: 'easeInOutQuart',
        scale: 1,
        fill: '#7C7C7C',
      })
      .add(
        {
          targets: '.song',
          delay: 0,
          duration: 50,
          easing: 'easeInOutQuart',
          translateX: i * -30,
          opacity: 0,
        },
        '-=100',
      )
      .add({
        targets: '.song',
        delay: 5,
        duration: 20,
        update: function () {
          document.getElementById('songtitle').innerHTML = data[replyindex - 1];
        },
        translateX: i * 60,
        opacity: 0,
      })
      .add({
        targets: '.song',
        delay: 0,
        duration: 50,
        easing: 'easeInOutQuart',
        translateX: -0,
        opacity: 1,
      });

    console.log(Liked);
    setisLiked(Liked[replyindex - 1]);
    playref.current.reset()
    barref.current.reset()
    paused = true
  }

  function playanimation(){
    if (paused==true){
      playref.current.reset()
      playref.current.play()
      barref.current.play()
      paused = false
    }
    else{
      barref.current.pause()
      playref.current.reverse()
      playref.current.play()
      
      paused = true
    }
    
  }

  return (
    <StyledLoader className="loader" isMounted={isMounted} isLiked={isLiked}>
      <Helmet bodyAttributes={{ class: `hidden` }} />
      <div className="column">
        <div className="above-bar">
          <div className="names">
            <div className="song" id="songtitle">
              {data[0]}
            </div>
            <div className="artist">Julien Guinot</div>
          </div>
          <div className="like-button " onClick={() => animatelike()}>
            <Heart />
          </div>
        </div>

        <div className="level-bar">
          <div className="left-time" id="progresstime">
            0:00
          </div>

          <div className="loading-bar-wrapper">
            <LoadBar />
          </div>

          <div className="right-time">
            {minutes}:{seconds}
          </div>
        </div>

        <div className="below_bar">
          <div className="left-skip" onClick={() => replies(-1)}>
            <SkipLeft />
          </div>

          <div className="logo-wrapper" id="Icon" onClick={() => playanimation()}>
            <IconLoader />
          </div>

          <div className="right-skip" onClick={() => replies(1)}>
            <SkipRight />
          </div>
        </div>
      </div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
