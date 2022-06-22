import { useState, useEffect } from "react";
import { appTitle, apiPath_projects, apiPath_pages } from "../global/globals";
import Paragraph from "../components/Paragraph";
import ProjectCard from "../components/ProjectCard";
import Loading from "../components/Loading";
import backdropImg from "../images/space-bg.svg";
import spaceman from "../images/spaceman-sketch.png";

const PageHome = () => {

  const homePagePath = `${apiPath_pages}?slug=home`
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

  // Load Home Page Data
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(homePagePath)
      if ( response.ok ) {
        const data = await response.json()
        setHomePageData(data[0])
        setHomePageLoadStatus(true)
      } else {
        setHomePageLoadStatus(false)
      }
    }
    fetchData()
    
  }, [homePagePath])

  // Load Project Data
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
      {(isHomePageLoaded && isProjectLoaded) ? 
        <>
          <section className="section-banner">
            <div className="banner-backdrop">
              <img src={backdropImg} alt="Space background" className="backdrop-image" />
            </div>
            <div className="banner-content">
              <div className="banner-text">
                <h1>{homePageData.title.rendered}</h1>
                <p>{homePageData.acf.page_subtitle}</p>
              </div>
              <div className="banner-image">
                <img src={spaceman} alt="Spaceman illustration" />
              </div>
            </div>
          </section>
          <section id="work" className="section-work">
            <h2 className="screen-reader-text">Work</h2>
            {homePageData.acf.featured_projects.map((project_id, id) => {
              const project = projectsData.find((project) => project.id === project_id);
              return (
                <ProjectCard 
                  key={project.id}
                  project={project} 
                  className={id%2 === 0 ? "align-left" : "align-right" }
                />
              )
            })}
          </section>
          <section id="about" className="section-about">
            <h2 className="screen-reader-text">About</h2>
            <p className="highlighted-overview">{homePageData.acf.about.highlighted_overview}</p>
            <Paragraph text={homePageData.acf.about.overview} />
          </section>
          <section className="section-skills">
            <h2>{homePageData.acf.skills.heading}</h2>
            {homePageData.acf.skills.skill_categories && homePageData.acf.skills.skill_categories.length > 0 &&
              <ul className="skill-list">
                {homePageData.acf.skills.skill_categories.map((skill_category, id) => {
                  return (
                    <li key={id}>
                      <span className="category_name">{skill_category.category_name}:</span> {skill_category.skill_list}
                    </li>
                  )
                })}
              </ul>
            }
          </section>
          <section id="contact" className="section-contact">
            <h2 className="screen-reader-text">Contact</h2>
            <p>{homePageData.acf.contact.message}</p>
            <a href={`mailto:${homePageData.acf.contact.email}`}>{homePageData.acf.contact.email}</a>
          </section>
        </>
      :
        <Loading />
      }
    </section>
  );

};

export default PageHome;