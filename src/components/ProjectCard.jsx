import { Link } from "react-router-dom"
import Paragraph from "./Paragraph"
import ResponsivePicture from "./ResponsivePicture"

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
          <h3>{project.title.rendered}</h3>
          <p>{project.acf.project_subtitle}</p>
          <Paragraph text={project.acf.project_overview}/>
          <Link to={`/projects/${project.slug}`}>View the project</Link>
        </div>
      </article>
  )
}

ProjectCard.defaultProps = {
  className: ""
}

export default ProjectCard