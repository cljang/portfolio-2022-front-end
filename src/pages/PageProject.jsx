import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom";
import { appTitle } from "../global/globals";
import ExternalLink from "../components/icons/ExternalLink";
import Github from "../components/icons/Github";
import Globe from "../components/icons/Globe";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import Paragraph from "../components/Paragraph";
import ResponsivePicture from "../components/ResponsivePicture";
import ProjectFeature from "../components/ProjectFeature";
import AnimationObserver from "../components/AnimationObserver";

const PageProject = () => {
  const { project_slug } = useParams();
  
  // All Projects Data
  const projectsData = useSelector((state) => state.project.projects)
  const isProjectsDataLoaded = useSelector((state) => state.project.loaded)

  // Project Data
  const [projectData, setProjectData] = useState([])
  const [otherProjectsData, setOtherProjectsData] = useState([])
  const [isProjectLoaded, setProjectLoadStatus] = useState(false)

  const navigate = useNavigate();
  
  // On mount: 
  //    Scroll back to the top
  useEffect(() => {
    document.title = `${appTitle}`;
    window.scrollTo(0, 0);
  }, [project_slug])

  // Get the current projectData and otherProjectData
  useEffect(() => {
    // Ensure data is loaded, if not redirect to 404
    if (isProjectsDataLoaded && projectsData.length > 0 ) {
      // Find the current project based on the project_slug param and save it in the projectData state
      // Record all other projects in a separate array
      let thisProject;
      let otherProjects = [];
      projectsData.forEach((project) => {
        if (project.slug === project_slug) {
          thisProject = project;
        } else {
          otherProjects.push(project);
        }
      })

      if (thisProject) {
        // Save the current project in the projectData state
        // Save an array of 2 other projects in the otherProjectsData State
        setProjectData(thisProject)
        setOtherProjectsData(otherProjects.slice(0,2))
        setProjectLoadStatus(true)
      } else {
        navigate("/404");
      }
    }
  }, [isProjectsDataLoaded, projectsData, project_slug, navigate])

  return (
    <>
      <section className={`page page-project ${isProjectLoaded ? `project-${projectData.slug}` : ""}`}>
        {isProjectLoaded ? 
          <>
            <AnimationObserver id={project_slug}>
              <div className="content-wrapper">
                <section className="project-header">
                  <div className="project-header-text animate fade-in-down">
                    {projectData.acf.year &&
                      <p className="project-year">{projectData.acf.year}</p>
                    }
                    {projectData.title.rendered &&
                      <h1 className="project-name">{projectData.title.rendered}</h1>
                    }
                    {projectData.acf.subtitle &&
                      <p className="project-subtitle">{projectData.acf.subtitle}</p>
                    }
                  </div>
                  {projectData.acf.featured_image &&
                    <ResponsivePicture
                      className="featured-image animate fade-in-up animation-delay-500"
                      haha="test"
                      imageArray={projectData.acf.featured_image}
                      alt={`${projectData.title.rendered} featured image`}
                    />
                  }
                </section>
                <section className="project-details-section">
                  <h2 className="screen-reader-text">Project Details</h2>
                  <div className="left-column animate fade-in-right">
                    {
                      projectData.acf.overview &&
                      <section>
                        <h3>Overview</h3>
                        <Paragraph text={projectData.acf.overview}/>
                      </section>
                    }
                    {
                      projectData.acf.technologies &&
                      <section>
                        <h3>Technologies</h3>
                        <p>{projectData.acf.technologies}</p>
                      </section>
                    }
                  </div>
                  <div className="right-column animate fade-in-left animation-delay-500">
                    {
                      projectData.acf.collaborators &&
                      <section className="project-collaborators-section">
                        <h3>Collaborators</h3>
                        <ul>
                          {projectData.acf.collaborators.map((collaborator, id) => {
                            return (
                              <li key={id}>
                                <a 
                                  href={collaborator.link} 
                                  className="collaborator-link" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                >
                                  {collaborator.name} <ExternalLink className="link-icon" aria-hidden />
                                </a>
                              </li>
                            )
                          })}
                        </ul>
                      </section>
                    }
                    {
                      (projectData.acf.live_site || projectData.acf.github_repo) &&
                      <section className="project-links-section">
                        <h3>View the Project</h3>
                        {projectData.acf.live_site &&
                          <a 
                            href={projectData.acf.live_site} 
                            className="project-link"
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <Globe title="Live Site" className="link-icon live-site-icon" />
                          </a>
                        }
                        {projectData.acf.github_repo &&
                          <a 
                            href={projectData.acf.github_repo} 
                            className="project-link"
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <Github title="GitHub Repository" className="link-icon github-icon" />
                          </a>
                        }
                      </section>
                    }
                  </div>
                </section>
                <section className="project-features-section">
                  <h2 className="project-features-header animate fade-in-right">Features</h2>
                  {projectData.acf.features ? 
                    projectData.acf.features.map((featureObj,id) => {
                      return <ProjectFeature key={id} featureObj={featureObj} className={`animate ${id%2 === 0 ? "align-left fade-in-right" : "align-right fade-in-left"}`} />
                    }) 
                  : 
                    <p className="coming-soon animate fade-in-up">Coming soon.</p>
                  }
                </section>
                <section className="other-projects-section">
                  <h2 className="other-projects-header animate fade-in-up">More Projects</h2>
                  {otherProjectsData.map((project, id) => {
                    return (
                      <article
                        className={`project-card animate .animation-delay-250 ${id%2 === 0 ? "fade-in-right align-left" : "fade-in-left align-right" }`}
                        key={project.id}
                      >
                        <Link to={`/projects/${project.slug}`} className="project-link">
                          <ResponsivePicture
                            className="project-image"
                            imageArray={project.acf.featured_image}
                            alt={`${project.title.rendered} featured image`}
                            limitSteps={2}
                            loading="lazy"
                          />
                          <div className="project-text">
                            <h3 className="project-title">{project.title.rendered}</h3>
                            <p className="project-subtitle">{project.acf.subtitle}</p>
                          </div>
                        </Link>
                      </article>
                    )
                  })}
                </section>
              </div>
            </AnimationObserver>
          </>
        :
          <Loading />
        }
      </section>
    </>
  );

};

export default PageProject;