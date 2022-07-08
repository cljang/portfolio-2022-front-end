import Globe from "../components/icons/Globe";
import Github from "../components/icons/Github";

function ProjectLink({link}) {

  const pickIcon = () => {
    switch (link.icon) {
      case "globe":
        return (
          <Globe aria-hidden />
        )
      
      case "github":
        return (
          <Github aria-hidden />
        )
    
      default:
        break;
    }
  }

  return (
    <a 
      href={link.url} 
      className="project-link"
      target="_blank" 
      rel="noopener noreferrer"
    >
      {pickIcon()}
      <span className="link-text">{link.link_text}</span>
    </a>
  )
}

export default ProjectLink