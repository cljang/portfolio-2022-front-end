import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { appTitle, apiPath_projects } from "../global/globals";
import { FaGithub, FaExternalLinkAlt as FaLink } from "react-icons/fa";
import { BsGlobe } from "react-icons/bs"
import Loading from "../components/Loading";
import Paragraph from "../components/Paragraph";
import ResponsivePicture from "../components/ResponsivePicture";
import ProjectFeature from "../components/ProjectFeature";
import AnimationObserver from "../components/AnimationObserver";

const PageProject = () => {
  const { project_slug } = useParams();
  
  const projectPath = `${apiPath_projects}?slug=${project_slug}&_embed`
  const [projectData, setProjectData] = useState([])
  const [isProjectLoaded, setProjectLoadStatus] = useState(false)

  const navigate = useNavigate();
  
  // On mount: 
  //    Scroll back to the top
  useEffect(() => {
    document.title = `${appTitle}`;
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch(projectPath)
        if ( response.ok ) {
          const data = await response.json()

          // Ensure data is received, if not redirect to 404
          if (data && data.length > 0 ) {
            setProjectData(data[0])
            setProjectLoadStatus(true)
            document.title = `${data[0].title.rendered} - ${appTitle}`;
          } else {
            navigate("/404");
          }

        } else {
          setProjectLoadStatus(false)
        }
    }
    fetchData()
    
  }, [projectPath, navigate])

  return (
    <>
      <section className="page page-project">
        {isProjectLoaded ? 
          <>
            <header className="project-header">
              <div className="project-header-text animate fade-in-down">
                {projectData.acf.year &&
                  <p className="project-year">{projectData.acf.year}</p>
                }
                {projectData.title.rendered &&
                  <h1>{projectData.title.rendered}</h1>
                }
                {projectData.acf.subtitle &&
                  <p>{projectData.acf.subtitle}</p>
                }
              </div>
              {projectData.acf.featured_image &&
                <ResponsivePicture
                  className="featured-image animate fade-in-up animation-delay-500"
                  imageArray={projectData.acf.featured_image}
                  alt={`${projectData.title.rendered} featured image`}
                />
              }
            </header>
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
                            <a href={collaborator.link} className="collaborator-link" >
                              {collaborator.name} <FaLink className="link-icon" aria-hidden />
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
                      <a href={projectData.acf.live_site} className="project-link">
                        <BsGlobe title="Live Site" className="link-icon live-site-icon" />
                      </a>
                    }
                    {projectData.acf.github_repo && 
                      <a href={projectData.acf.github_repo} className="project-link">
                        <FaGithub title="GitHub Repository" className="link-icon github-icon" />
                      </a>
                    }
                  </section>
                }
              </div>
            </section>
            <section className="project-features-section">
              <h2 className="animate fade-in-right">Features</h2>
              {projectData.acf.features && projectData.acf.features.map((featureObj,id) => {
                return <ProjectFeature key={id} featureObj={featureObj} className={`animate ${id%2 === 0 ? "align-left fade-in-right" : "align-right fade-in-left"}`} />
              })}
            </section>
            <AnimationObserver />
          </>
        :
          <Loading />
        }
      </section>
    </>
  );

};

export default PageProject;