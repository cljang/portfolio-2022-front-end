import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { appTitle, apiPath_projects } from "../global/globals";
import { FaGithub } from "react-icons/fa";
import { BsGlobe } from "react-icons/bs"
import Loading from "../components/Loading";
import ProjectFeature from "../components/ProjectFeature";

const PageProject = () => {
  const { project_slug } = useParams();
  
  const restPath = `${apiPath_projects}?slug=${project_slug}&_embed`
  const [restData, setData] = useState([])
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
        const response = await fetch(restPath)
        if ( response.ok ) {
          const data = await response.json()

          // Ensure data is received, if not redirect to 404
          if (data && data.length > 0 ) {
            setData(data[0])
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
    
  }, [restPath, navigate])

  return (
    <>
      <section className="page page-project">
        {isLoaded ? 
          <>
            {restData.acf.project_year && <p>{restData.acf.project_year}</p>}
            {restData.title.rendered && <h1>{restData.title.rendered}</h1>}
            {restData.acf.project_subtitle && <p>{restData.acf.project_subtitle}</p>}
            {restData.acf.project_overview && <div dangerouslySetInnerHTML={{__html: restData.acf.project_overview}} />}
            {restData.acf.project_duration && <p>{restData.acf.project_duration}</p>}
            {restData.acf.project_live_site && restData.acf.project_github_repo && <div>
              {restData.acf.project_live_site && <a href={restData.acf.project_live_site}>
                <BsGlobe />
                <span>Live Site</span>
              </a>}
              {restData.acf.project_github_repo && <a href={restData.acf.project_github_repo}>
                <FaGithub />
                <span>GitHub Repository</span>
              </a>}
            </div>}
            <section className="project-features-section">
              {restData.acf.project_features && restData.acf.project_features.map((featureObj,id) => {
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