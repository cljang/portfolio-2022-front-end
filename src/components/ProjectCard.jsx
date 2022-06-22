import { Link } from "react-router-dom"
import Paragraph from "./Paragraph"
import ResponsivePicture from "./ResponsivePicture"
import { FaArrowRight } from "react-icons/fa";

function ProjectCard({project, className}) {
  return (
    project && 
      <article 
        className={`project-card ${className}`}
      >
        <ResponsivePicture 
          className="project-image"
          imageArray={project.acf.project_featured_image.image_sources}
          alt={project.acf.project_featured_image.alt}
          limitSteps={2}
        />
        <div className="project-text">
          <h3 className="project-title">{project.title.rendered}</h3>
          <p className="project-subtitle">{project.acf.project_subtitle}</p>
          <Paragraph className="project-description" text={project.acf.project_overview}/>
          <Link to={`/projects/${project.slug}`} className="project-link">
            <span className="link-content"><span className="link-text">View Project</span> <FaArrowRight className="link-icon" aria-hidden /></span>
          </Link>
        </div>
      </article>
  )
}

ProjectCard.defaultProps = {
  className: ""
}

export default ProjectCard