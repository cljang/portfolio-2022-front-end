import { useState, useRef, useEffect } from 'react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import codeTheme  from '../global/codeTheme';
import Paragraph from './Paragraph';
import ResponsivePicture from './ResponsivePicture';

function ProjectFeature({featureObj, className}) {
  
  const overviewRef = useRef();
  const [overviewStyle, setOverviewStyle] = useState();

  // When the feature overview becomes sticky, make it stick such that it is vertically centered on the page 
  useEffect(() => {
    if (overviewRef.current) {
      // If the window matches the media query from css we can update the top parameter
      // If smaller, than do nothing
      const handleResize = () => {
        const mediaQuery = window.matchMedia('(min-width: 56.25rem)')
  
        if (mediaQuery.matches) {
          console.log("yes");
          const height = overviewRef.current.clientHeight;
          setOverviewStyle({
            top: `calc(50% - ${height/2}px)`
          })
        }
      }
      window.addEventListener('resize', handleResize)

      handleResize();

      return () => {
        window.removeEventListener('resize', handleResize);
      }
    }
  }, [overviewRef])

  // Function to handle how different types of feature content is rendered
  const renderFeatureContent = (featureContentObj) => {
    // Ensure featureContentObj is defined
    if (featureContentObj) {
      // featureContentObj is a WordPress ACF Pro Flexible Content (FC) block, where the type of content is defined using the acf_fc_layout parameter
      switch (featureContentObj.acf_fc_layout) {
        // For text_content, input is a text area that autmatically adds <p> tags
        case "text_content":
          return (
            featureContentObj.text && <div className="text-content">
              <Paragraph text={featureContentObj.text}/>
            </div>
          );
        
        // For image_content, take a gallery of responsive images from largest to smallest and build a responsive <picture> element
        case "image_content":
          return (
            <ResponsivePicture 
              className="image-content"
              imageArray={featureContentObj.image_sources}
              alt={featureContentObj.alt}
            />
          );

        // For code_content, use a Prism.js syntax highlighter to output a code block
        case "code_content":
          return (
            <div 
              className="code-content" 
            >
              { featureContentObj.code && 
                <SyntaxHighlighter 
                  language={featureContentObj.language} 
                  style={codeTheme}
                  showLineNumbers={true}
                >
                  {featureContentObj.code}
                </SyntaxHighlighter>
              }
            </div>
          );

        case "video_content":
        return (
          <div 
            className="video-content" 
          >
            <video autoPlay muted loop>
              <source src={featureContentObj.video.url} type={featureContentObj.video.mime_type} />
            </video>
          </div>
        );
      
        default:
          break;
      }
    }
  }

  return (
    <>
      {featureObj && 
        <section className={`feature ${className}`}>
          {(featureObj.heading || featureObj.description) && 
            <div 
              className="feature-overview"
              ref={overviewRef}
              style={overviewStyle ? overviewStyle : {}}
            >
              {featureObj.heading && <h3 className="feature-heading">{featureObj.heading}</h3>}
              {featureObj.description && <Paragraph text={featureObj.description}/>}
            </div>
          }
          {featureObj.content && <div className="feature-content">
            {featureObj.content.map((featureContentObj, id) => {
              return (
                <div
                  key={id}
                  className="feature-content-item"
                >
                  {renderFeatureContent(featureContentObj)}
                </div>
              );
            })}
          </div>}
        </section>
      }
    </>
  )
}

ProjectFeature.defaultProps = {
  className: ""
}

export default ProjectFeature