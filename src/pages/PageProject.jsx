import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { appTitle, apiPath_projects } from "../global/globals";
import { FaGithub } from "react-icons/fa";
import { BsGlobe } from "react-icons/bs"
import Loading from "../components/Loading";
import Paragraph from "../components/Paragraph";
import ProjectFeature from "../components/ProjectFeature";

const PageProject = () => {
  const { project_slug } = useParams();
  
  const projectPath = `${apiPath_projects}?slug=${project_slug}&_embed`
  const [projectData, setProjectData] = useState([])
  const [isLoaded, setLoadStatus] = useState(false)

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
            setLoadStatus(true)
            document.title = `${data[0].title.rendered} - ${appTitle}`;
          } else {
            navigate("/404");
          }

        } else {
          setLoadStatus(false)
        }
    }
    fetchData()
    
  }, [projectPath, navigate])

  return (
    <>
      <section className="page page-project">
        {isLoaded ? 
          <>
            {projectData.acf.project_year && <p>{projectData.acf.project_year}</p>}
            {projectData.title.rendered && <h1>{projectData.title.rendered}</h1>}
            {projectData.acf.project_subtitle && <p>{projectData.acf.project_subtitle}</p>}
            {projectData.acf.project_overview && <Paragraph text={projectData.acf.project_overview}/>}
            {projectData.acf.project_duration && <p>{projectData.acf.project_duration}</p>}
            {projectData.acf.project_live_site && projectData.acf.project_github_repo && <div>
              {projectData.acf.project_live_site && <a href={projectData.acf.project_live_site}>
                <BsGlobe />
                <span>Live Site</span>
              </a>}
              {projectData.acf.project_github_repo && <a href={projectData.acf.project_github_repo}>
                <FaGithub />
                <span>GitHub Repository</span>
              </a>}
            </div>}
            <section className="project-features-section">
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