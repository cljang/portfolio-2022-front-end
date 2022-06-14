import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { appTitle, apiPath_projects } from "../global/globals";
import Paragraph from "../components/Paragraph";
import Loading from "../components/Loading";

const PageHome = () => {

  const homePagePath = `${apiPath_projects}`
  const [homePageData, setHomePageData] = useState([])
  const [isHomePageLoaded, setHomePageLoadStatus] = useState(false)

  const projectsPath = `${apiPath_projects}`
  const [projectsData, setProjectsData] = useState([])
  const [isProjectLoaded, setProjectLoadStatus] = useState(false)

  // On mount: 
  //    Set document title
  //    Scroll back to the top
  useEffect(() => {
    document.title = `${appTitle}`
    window.scrollTo(0, 0); 
  }, [])

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch(projectsPath)
        if ( response.ok ) {
          const data = await response.json()
          setProjectsData(data)
          setProjectLoadStatus(true)

        } else {
          setProjectLoadStatus(false)
        }
    }
    fetchData()
    
  }, [projectsPath])

  return (
    <section className="page page-home">
      {isProjectLoaded ? 
        <>
          <h1>Home</h1>
          <section id="work">
            {projectsData.map((project,id) => {
              return (
                <article key={id}>
                  <h3>{project.title.rendered}</h3>
                  <p>{project.acf.project_subtitle}</p>
                  <Paragraph text={project.acf.project_overview}/>
                  <Link to={`/projects/${project.slug}`}>View the project</Link>
                </article>
              )
            })}
          </section>
        </>
      :
        <Loading />
      }
    </section>
  );

};

export default PageHome;