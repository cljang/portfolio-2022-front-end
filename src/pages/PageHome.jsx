import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux"
import { appTitle, apiPath_pages } from "../global/globals";
import Paragraph from "../components/Paragraph";
import ProjectCard from "../components/ProjectCard";
import Loading from "../components/Loading";
import spaceman from "../images/spaceman-sketch.webp";
import AnimationObserver from "../components/AnimationObserver";

const PageHome = () => {

  // API Variables
  const homePagePath = `${apiPath_pages}?slug=home`
  const [homePageData, setHomePageData] = useState([])
  const [isHomePageLoaded, setHomePageLoadStatus] = useState(false)

  // All Projects Data
  const projectsData = useSelector((state) => state.project.projects)
  const isProjectsDataLoaded = useSelector((state) => state.project.loaded)

  // Email Button Clicked - use to show/hide "Copied to Clipboard" message
  const [ showMessage, setShowMessage ] = useState(false);
  let timeout = useRef();

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

  // Email button - copy to clipboard
  const copyButtonText = (e) => {
    e.preventDefault();

    // Copy button text to clipboard
    navigator.clipboard.writeText(e.target.innerText)

    // Show the copied message and then hide after a certain timeout
    setShowMessage(true)
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      setShowMessage(false);
    }, 2000)
  } 

  return (
    <section className="page page-home">
      {(isHomePageLoaded && isProjectsDataLoaded) ? 
        <>
          <AnimationObserver>
            <section className="section-banner">
              <div className="banner-text animate fade-in-up animation-delay-250">
                <h1 className="banner-title">{homePageData.title.rendered}</h1>
                <p className="banner-subtitle">{homePageData.acf.page_subtitle}</p>
              </div>
              <div className="banner-image animate fade-in-up fade-in-left animation-delay-500">
                <img src={spaceman} alt="Spaceman illustration" width={800} height={959} fetchpriority="high" />
              </div>
            </section>
            <section id="work" className="section-work scroll-target">
              <h2 className="screen-reader-text">Work</h2>
              {homePageData.acf.featured_projects.map((project_id, id) => {
                const project = projectsData.find((project) => project.id === project_id);
                if (project) {
                  return (
                    <ProjectCard 
                      key={project.id}
                      project={project} 
                      className={`animate  ${id%2 === 0 ? "fade-in-left align-left" : "fade-in-right align-right" }`}
                    />
                  )
                } else {
                  return(null)
                }
              })}
            </section>
            <section id="about" className="section-about scroll-target animate fade-in-up">
              <h2 className="screen-reader-text">About</h2>
              <p className="highlighted-overview">{homePageData.acf.about.highlighted_overview}</p>
              <Paragraph text={homePageData.acf.about.overview} />
            </section>
            <section className="section-skills animate fade-in-up">
              <h2>{homePageData.acf.skills.heading}</h2>
              {homePageData.acf.skills.skill_categories && homePageData.acf.skills.skill_categories.length > 0 &&
                <ul className="skill-list">
                  {homePageData.acf.skills.skill_categories.map((skill_category, id) => {
                    return (
                      <li className="skill" key={id}>
                        <h3 className="category-name">{skill_category.category_name}:</h3> 
                        <p>{skill_category.skill_list}</p>
                      </li>
                    )
                  })}
                </ul>
              }
            </section>
            <section id="contact" className="section-contact scroll-target animate fade-in-up">
              <h2 className="screen-reader-text">Contact</h2>
              <p className="contact-message">{homePageData.acf.contact.message}</p>
              <div className="email-button">
                <button onClick={copyButtonText}>
                  {homePageData.acf.contact.email}
                  <div className="underline"></div>
                </button>
              </div>
              <p className={`email-copied-message ${showMessage ? "" : "hidden"}`}>Copied to Clipboard</p>
            </section>
          </AnimationObserver>
        </>
      :
        <Loading />
      }
    </section>
  );

};

export default PageHome;