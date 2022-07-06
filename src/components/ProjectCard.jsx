import { Link } from "react-router-dom"
import Paragraph from "./Paragraph"
import ResponsivePicture from "./ResponsivePicture"
import ArrowRight from "./icons/ArrowRight";

function ProjectCard({project, className}) {
  return (
    project && 
      <article 
        className={`project-card ${className}`}
      >
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
          <Paragraph className="project-description" text={project.acf.overview}/>
          <Link to={`/projects/${project.slug}`} className="project-link">
            <span className="link-content"><span className="link-text">View Project</span> <ArrowRight className="link-icon" aria-hidden /></span>
          </Link>
        </div>
      </article>
  )
}

ProjectCard.defaultProps = {
  className: ""
}

export default ProjectCard