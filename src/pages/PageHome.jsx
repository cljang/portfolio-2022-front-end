import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { appTitle, apiPath_projects } from "../global/globals";
import Paragraph from "../components/Paragraph";
import Loading from "../components/Loading";

const PageHome = () => {

  const restPath = `${apiPath_projects}`
  const [restData, setData] = useState([])
  const [isLoaded, setLoadStatus] = useState(false)

  // On mount: 
  //    Set document title
  //    Scroll back to the top
  useEffect(() => {
    document.title = `${appTitle}`
    window.scrollTo(0, 0); 
  }, [])

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch(restPath)
        if ( response.ok ) {
          const data = await response.json()
          setData(data)
          setLoadStatus(true)

        } else {
          setLoadStatus(false)
        }
    }
    fetchData()
    
  }, [restPath])

  return (
    <section className="page page-home">
      {isLoaded ? 
        <>
          <h1>Home</h1>
          <section>
            {restData.map((project) => {
              return (
                <article>
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