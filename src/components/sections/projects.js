import React, { useState, useEffect, useRef } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { usePrefersReducedMotion } from '@hooks';

const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .archive-link {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    &:after {
      bottom: 0.1em;
    }
  }

  .projects-grid {
    ${({ theme }) => theme.mixins.resetList};
    max-width: 1000px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 20px;
    position: relative;
    margin-top: 40px;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    }
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 80px auto 0;
  }
`;

const StyledProject = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .project-inner {
        background-color: var(--greyfill);
      }
    }
  }

  a {
    position: relative;
    z-index: 2;
  }

  .project-inner {
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 1.1rem 1.1rem;
    border-radius: 10px;
    background-color: var(--verydarkgrey);
    transition: var(--transition);
  }

  .project-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 20px;

    
    .project-image {
      ${({ theme }) => theme.mixins.dropShadow};
      border-radius:10px;
      z-index: 2;

      
  

      a {
        width: 100%;
        height: 100%;
        background-color: transparent;
        border-radius: 10px;
        

        .project-tech-list {
          position: absolute;
          display: flex;
          flex-flow: row wrap;
          justify-content: flex-start;
          left: -50px;
          right: 20px;
          bottom: 10px;
          z-index: 100;
          list-style: none;
          opacity: 0;
          transition: var(--transition);
          
      
          li {
            font-family: var(--font-sans);
            border: 1px solid var(--green);
            border-radius : 10px;
            color: var(--green);
            margin : 3px;
            padding: 3px 5px 0px 5px;
            font-size: var(--fz-xs);
            z-index: 1;
            &:hover,
            &:focus {
              background: var(--green);
              color: #FFFFFF;
              transition: var(--transition)
            }
          }
        }
        

        &:hover,
        &:focus {
          background: transparent;
          border-radius: 10px;

          &:before,
          .img {
            background: linear-gradient(to bottom, #FFFFFF, #000000 75%);
            mix-blend-mode: multiply;
            border-radius:10px;
            filter: none;
          }
        }

        &:hover .project-tech-list{
          opacity:100;
          transition: var(--transition);
          transform: translateX(20px);
        }

        &:before {
          content: '';
          position: absolute;
          border-radius: 10px
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
      }

      .img {
        border-radius: 10px;
        mix-blend-mode: multiply;


        @media (max-width: 768px) {
          border-radius: 10px;
          object-fit: cover;
          width: auto;
          height: 100%;
        }
      }
    }
    
  }

  .project-title {
    margin: 0 0 5px;
    color: var(--white);
    font-size: var(--fz-md);

    a {
      position: static;

      &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }

  .project-description {
    color: var(--light-slate);
    font-size: 17px;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .project-links {
    margin-right: -100px;
    color: var(--darkgrey);
    margin-left: 150px;

    a {
      padding: 0px 5px;
      

      &.external {
        svg {
          width: 15px;
          height: 15px;
          margin-top: 10px;
        }
      }

      svg {
        width: 15px;
        height: 15px;
        margin-top: 10px;
      }
    }
  }

  
`;

const Projects = () => {
  const data = useStaticQuery(graphql`
    query {
      projects: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/projects/" }
          frontmatter: { showInProjects: { ne: false } }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              tech
              github
              external
              image {
                childImageSharp {
                  gatsbyImageData(width: 700, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
            }
            html
          }
        }
      }
    }
  `);

  const [showMore, setShowMore] = useState(false);
  const revealTitle = useRef(null);
  const revealArchiveLink = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealArchiveLink.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const GRID_LIMIT = 6;
  const projects = data.projects.edges.filter(({ node }) => node);
  console.log(projects);
  const firstSix = projects.slice(0, GRID_LIMIT);
  const projectsToShow = showMore ? projects : firstSix;

  const projectInner = node => {
    const { frontmatter, html } = node;
    const { github, external, title, tech, image } = frontmatter;
    const cover = getImage(image);

    return (
      <div className="project-inner">
        <header>
          <div className="project-top">
            <div className="project-image">
              <a href={external ? external : github ? github : '#'}>
                <div>
                  {tech && (
                    <ul className="project-tech-list">
                      {tech.map((tech, i) => (
                        <li key={i}>{tech}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <GatsbyImage image={cover} alt={title} className="img" />
              </a>
            </div>
          </div>

          <h3 className="project-title">
            <a href={external} target="_blank" rel="noreferrer">
              {title}
            </a>
          </h3>

          <div className="project-description" dangerouslySetInnerHTML={{ __html: html }} />
        </header>

        <div className="project-links">
          {github && (
            <a href={github} aria-label="GitHub Link" target="_blank" rel="noreferrer">
              <Icon name="GitHub" />
            </a>
          )}
          {external && (
            <a
              href={external}
              aria-label="External Link"
              className="external"
              target="_blank"
              rel="noreferrer">
              <Icon name="External" />
            </a>
          )}
        </div>
      </div>
    );
  };

  return (
    <StyledProjectsSection>
      <h2 ref={revealTitle}>Some other stuff I made</h2>

      <ul className="projects-grid">
        {prefersReducedMotion ? (
          <>
            {projectsToShow &&
              projectsToShow.map(({ node }, i) => (
                <StyledProject key={i}>{projectInner(node)}</StyledProject>
              ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {projectsToShow &&
              projectsToShow.map(({ node }, i) => (
                <CSSTransition
                  key={i}
                  classNames="fadeup"
                  timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                  exit={false}>
                  <StyledProject
                    key={i}
                    ref={el => (revealProjects.current[i] = el)}
                    style={{
                      transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
                    }}>
                    {projectInner(node)}
                  </StyledProject>
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}
      </ul>
    </StyledProjectsSection>
  );
};

export default Projects;
