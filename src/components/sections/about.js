import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 1000px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }

`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '>';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }

  
  p {
    font-size: 17px
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 140%;
    border-radius: 500px;
    background-color: transparent;
    

    &:hover,
    &:focus {
      background: transparent;
      outline: 0;

      &:after {
        top: 80px;
        left: 90px;
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
        z-index: 0;
        @media (max-width: 768px) {
          overflow-x:visible;
        }
      }
    }

    .img {
      position: relative;
      border-radius: 200px;
      mix-blend-mode: normal;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
      z-index:0;
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 85%;
      height: 85%;
      border-radius: 200px;
      transition: var(--transition);
      z-index:0;
    }

    &:before {
      top: 0;
      left: 0;
      background-color: transparent;
      mix-blend-mode: screen;
      z-index:-1;
    }

    &:after {
      border: 4px solid var(--green);
      top: 70px;
      left: 80px;
      z-index:-1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = ['Python', 'Pytorch', 'TensorFlow/Keras', 'Librosa','SQL/NoSQL', 'Git', 'Azure/AWS', 'C++','Jenkins'];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">Me, myself and I</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hello! I’m Julien, a music afficionado with a vivid interest for machine learning.
              I’ve always loved music, as a 10-year self-taught guitar, piano, bass player and
              producer. The promise musical applications hold in the fields of data science,
              analysis and machine learning make me excited about the future of music!
            </p>

            <p>
              Up till now, I’ve been pursuing studies in engineering, with a focus on Musical acoustics and deep learning <a href="https://www.ec-lyon.fr/">France</a>{' '} and <a href="https://www.adelaide.edu.au/">Australia</a>{' '}. My discovery of data science
              and my problem-solving mindset have led me to pursue independent and 
              university courses in the domains of machine learning, deep learning, and more specifically MIR. 
            </p>

            <p>
              My personal projects and interships at <a href="https://www.data-newroad.com/">Data New Road</a>{' '}, <a href="https://www.artefact.com/">Artefact</a>{' '}, and more recently at <a href="https://www.groover.co/">Groover</a>{' '} have given me
              the opportunity to work with the following technologies:    
            </p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.png"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
