import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { appTitle, apiPath_projects } from "../global/globals";
import { FaGithub, FaExternalLinkAlt as FaLink } from "react-icons/fa";
import { BsGlobe } from "react-icons/bs"
import Loading from "../components/Loading";
import Paragraph from "../components/Paragraph";
import ResponsivePicture from "../components/ResponsivePicture";
import ProjectFeature from "../components/ProjectFeature";

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
              {projectData.acf.project_year && 
                <p className="project-year">{projectData.acf.project_year}</p>
              }
              {projectData.title.rendered && 
                <h1>{projectData.title.rendered}</h1>
              }
              {projectData.acf.project_subtitle && 
                <p>{projectData.acf.project_subtitle}</p>
              }
              {projectData.acf.project_featured_image &&
                <ResponsivePicture
                  className="featured-image"
                  imageArray={projectData.acf.project_featured_image.image_sources}
                  alt={projectData.acf.project_featured_image.alt}
                />
              }
            </header>
            <section className="project-details-section">
              <h2 className="screen-reader-text">Project Details</h2>
              <div className="left-column">
                {
                  projectData.acf.project_overview &&
                  <section>
                    <h3>Overview</h3>
                    <Paragraph text={projectData.acf.project_overview}/>
                  </section>
                }
                {
                  projectData.acf.project_technologies &&
                  <section>
                    <h3>Technologies</h3>
                    <p>{projectData.acf.project_technologies}</p>
                  </section>
                }
              </div>
              <div className="right-column">
                {
                  projectData.acf.project_duration &&
                  <section>
                    <h3>Duration</h3>
                    <p>{projectData.acf.project_duration}</p>
                  </section>
                }
                {
                  projectData.acf.project_collaborators &&
                  <section className="project-collaborators-section">
                    <h3>Collaborators</h3>
                    <ul>
                      {projectData.acf.project_collaborators.map((collaborator, id) => {
                        return (
                          <li key={id}>
                            <a href={collaborator.collaborator_link} className="collaborator-link" >
                              {collaborator.collaborator_name} <FaLink className="link-icon" />
                            </a>
                          </li>
                        )
                      })}
                    </ul>
                  </section>
                }
                {
                  projectData.acf.project_live_site && projectData.acf.project_github_repo &&
                  <section className="project-links-section">
                    <h3>View the Project</h3>
                    {projectData.acf.project_live_site && 
                      <a href={projectData.acf.project_live_site} className="project-link">
                        <BsGlobe title="Live Site" className="link-icon live-site-icon" />
                      </a>
                    }
                    {projectData.acf.project_github_repo && 
                      <a href={projectData.acf.project_github_repo} className="project-link">
                        <FaGithub title="GitHub Repository" className="link-icon github-icon" />
                      </a>
                    }
                  </section>
                }
              </div>
            </section>
            <section className="project-features-section">
              <h2>Features</h2>
              {projectData.acf.project_features && projectData.acf.project_features.map((featureObj,id) => {
                return <ProjectFeature key={id} featureObj={featureObj} className={id%2 === 0 ? "align-left" : "align-right"} />
              })}
            </section>
            
          </>
        :
          <Loading />
        }
      </section>
    </>
  );

};

export default PageProject;