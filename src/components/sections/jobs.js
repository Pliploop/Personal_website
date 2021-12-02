import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import { KEY_CODES } from '@utils';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import {
  IconFolder,
  Python,
  TensorFlow,
  Git,
  Azure,
  Keras,
  SQLNoSQL,
  JiraJenkins,
  Pytorch,
  SignalProc,
  Notebook,
  AppliedPhysics,
  Matlab,
  Acoustics,
  Research,
  Stats,
} from '../icons';

function get_icon(string) {
  switch (string) {
    case 'Python':
      return <Python />;
    case 'TensorFlow':
      return <TensorFlow />;
    case 'Git':
      return <Git />;
    case 'Azure Cloud':
      return <Azure />;
    case 'Keras':
      return <Keras />;
    case 'SQL/NoSQL':
      return <SQLNoSQL />;
    case 'Jira/Jenkins':
      return <JiraJenkins />;
    case 'Signal Processing':
      return <SignalProc />;
    case 'Notebook':
      return <Notebook />;

    case 'Applied physics':
      return <AppliedPhysics />;
    case 'Matlab':
      return <Matlab />;
    case 'Acoustics':
      return <Acoustics />;
    case 'Research':
      return <Research />;
    case 'Statistics':
      return <Stats />;

    case 'Pytorch':
      return <Pytorch />;
    default:
      return <IconFolder />;
  }
}

const StyledJobsSection = styled.section`
  max-width: 1000px;

  .inner {
    display: flex;

    @media (max-width: 600px) {
      display: block;
    }

    // Prevent container from jumping
    @media (min-width: 700px) {
      min-height: 340px;
    }
  }
`;

const StyledTabList = styled.div`
  position: relative;
  z-index: 3;
  width: max-content;
  padding: 0;
  margin: 0;
  list-style: none;

  @media (max-width: 600px) {
    display: flex;
    overflow-x: auto;
    width: calc(100% + 100px);
    padding-left: 50px;
    margin-left: -50px;
    margin-bottom: 30px;
  }
  @media (max-width: 480px) {
    width: calc(100% + 50px);
    padding-left: 25px;
    margin-left: -25px;
  }

  li {
    &:first-of-type {
      @media (max-width: 600px) {
        margin-left: 50px;
      }
      @media (max-width: 480px) {
        margin-left: 25px;
      }
    }
    &:last-of-type {
      @media (max-width: 600px) {
        padding-right: 50px;
      }
      @media (max-width: 480px) {
        padding-right: 25px;
      }
    }
  }
`;

const StyledTabButton = styled.button`
  ${({ theme }) => theme.mixins.link};
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--tab-height);
  padding: 3px 20px 2px;
  border-left: 1px solid var(--green);
  border-radius: 0 5px 5px 0;
  background-color: transparent;
  color: ${({ isActive }) => (isActive ? 'var(--green)' : 'var(--lightgrey)')};
  font-family: var(--font-sans);
  font-size: var(--fz-md);
  text-align: left;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0 15px 2px;
  }
  @media (max-width: 600px) {
    ${({ theme }) => theme.mixins.flexCenter};
    min-width: 120px;
    padding: 0 15px;
    border-left: 0;
    border-bottom: 2px solid var(--green);
    text-align: center;
  }

  &:hover,
  &:focus {
    background-color: var(--verydarkgrey);
  }
`;

const StyledHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 3px;
  height: var(--tab-height);
  border-radius: var(--border-radius);
  background: var(--green);
  transform: translateY(calc(${({ activeTabId }) => activeTabId} * var(--tab-height)));
  transition: transform 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0.05s;

  @media (max-width: 600px) {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: var(--tab-width);
    height: 2px;
    margin-left: 50px;
    transform: translateX(calc(${({ activeTabId }) => activeTabId} * var(--tab-width)));
  }
  @media (max-width: 480px) {
    margin-left: 25px;
  }
`;

const StyledTabPanels = styled.div`
  position: relative;
  width: 100%;
  margin-left: 20px;

  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 5px 0 50px;

  .container-j {
    display: flex;

    .job {
      width: 65%;

      ul {
        ${({ theme }) => theme.mixins.fancyList};
      }

      h3 {
        margin-bottom: 2px;
        font-size: var(--fz-xxl);
        font-weight: 500;
        line-height: 1.3;

        .company {
          color: var(--green);
        }
      }

      .range {
        margin-bottom: 25px;
        color: var(--green);
        font-family: var(--font-sans);
        font-size: var(--fz-xs);
      }
    }

    .StyledSkillPanels {
      position: relative;
      width: 35%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 0 10px 0 10px;
      margin-left: 40px;
      align-items: center;
      gap: 25px;

      @media (max-width: 600px) {
        margin-left: 0;
      }

      .panel {
        width: 100%;
        height: 14%;
        display: flex;
        display-direction: row;
        align-items: center;
        justify-content: flex-start;

        .icon-container {
          position: relative;
          width: 45px;
          height: 45px;
          border-radius: 8px;
          transition: var(--transition);

          svg {
            display: flex;
            margin: auto;
            margin-top: 8px;
            width: 70%;
            height: 70%;
            user-select: none;
          }

          &:hover svg {
            fill: var(--green);
          }

        }

        .skill-name {
          position: relative;
          align-items: center;
          font-size: var(--fz-md);
          margin: 0 0 0 20px;
          width: 70%;
        }
      }
    }
  }
`;

const Jobs = () => {
  const data = useStaticQuery(graphql`
    query {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/jobs/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              location
              range
              url
              skills
            }
            html
          }
        }
      }
    }
  `);

  const jobsData = data.jobs.edges;

  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState(null);
  const tabs = useRef([]);
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus();
      return;
    }
    // If we're at the end, go to the start
    if (tabFocus >= tabs.current.length) {
      setTabFocus(0);
    }
    // If we're at the start, move to the end
    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1);
    }
  };

  // Only re-run the effect if tabFocus changes
  useEffect(() => focusTab(), [tabFocus]);

  // Focus on tabs when using up & down arrow keys
  const onKeyDown = e => {
    switch (e.key) {
      case KEY_CODES.ARROW_UP: {
        e.preventDefault();
        setTabFocus(tabFocus - 1);
        break;
      }

      case KEY_CODES.ARROW_DOWN: {
        e.preventDefault();
        setTabFocus(tabFocus + 1);
        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    <StyledJobsSection id="jobs" ref={revealContainer}>
      <h2 className="numbered-heading">Education and experience</h2>

      <div className="inner">
        <StyledTabList role="tablist" aria-label="Job tabs" onKeyDown={e => onKeyDown(e)}>
          {jobsData &&
            jobsData.map(({ node }, i) => {
              const { company } = node.frontmatter;
              return (
                <StyledTabButton
                  key={i}
                  isActive={activeTabId === i}
                  onClick={() => setActiveTabId(i)}
                  ref={el => (tabs.current[i] = el)}
                  id={`tab-${i}`}
                  role="tab"
                  tabIndex={activeTabId === i ? '0' : '-1'}
                  aria-selected={activeTabId === i ? true : false}
                  aria-controls={`panel-${i}`}>
                  <span>{company}</span>
                </StyledTabButton>
              );
            })}
          <StyledHighlight activeTabId={activeTabId} />
        </StyledTabList>

        <StyledTabPanels>
          {jobsData &&
            jobsData.map(({ node }, i) => {
              const { frontmatter, html } = node;
              const { title, url, company, range, skills } = frontmatter;

              return (
                <CSSTransition key={i} in={activeTabId === i} timeout={250} classNames="fade">
                  <StyledTabPanel
                    id={`panel-${i}`}
                    role="tabpanel"
                    tabIndex={activeTabId === i ? '0' : '-1'}
                    aria-labelledby={`tab-${i}`}
                    aria-hidden={activeTabId !== i}
                    hidden={activeTabId !== i}>
                    <div className="container-j">
                      <div className="job">
                        <h3>
                          <span>{title}</span>
                          <span className="company">
                            &nbsp;@&nbsp;
                            <a href={url} className="inline-link">
                              {company}
                            </a>
                          </span>
                        </h3>

                        <p className="range">{range}</p>

                        <div dangerouslySetInnerHTML={{ __html: html }} />
                      </div>

                      <div className="StyledSkillPanels">
                        <div className="panel">
                          <div className="icon-container">{get_icon(skills[0])}</div>
                          <div className="skill-name">{skills[0]}</div>
                        </div>
                        <div className="panel">
                          <div className="icon-container">{get_icon(skills[1])}</div>
                          <div className="skill-name">{skills[1]}</div>
                        </div>
                        <div className="panel">
                          <div className="icon-container">{get_icon(skills[2])}</div>
                          <div className="skill-name">{skills[2]}</div>
                        </div>
                        <div className="panel">
                          <div className="icon-container">{get_icon(skills[3])}</div>
                          <div className="skill-name">{skills[3]}</div>
                        </div>
                      </div>
                    </div>
                  </StyledTabPanel>
                </CSSTransition>
              );
            })}
        </StyledTabPanels>
      </div>
    </StyledJobsSection>
  );
};

export default Jobs;
