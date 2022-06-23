
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import codeTheme  from '../global/codeTheme';
import Paragraph from './Paragraph';
import ResponsivePicture from './ResponsivePicture';

function ProjectFeature({featureObj, className}) {

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
              { featureContentObj.introduction && 
                <div 
                  className="code-introduction"
                  dangerouslySetInnerHTML={{__html: featureContentObj.introduction}} 
                />
              }
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
      
        default:
          break;
      }
    }
  }

  return (
    <>
      {featureObj && 
        <section className={`project-feature ${className}`}>
          <h3 className="project-feature-heading">{featureObj.heading}</h3>
          {featureObj.content.map((featureContentObj, id) => {
            return (
              <div 
                key={id}
                className="project-feature-content"
              >
                {renderFeatureContent(featureContentObj)}
              </div>
            );
          })}
        </section>
      }
    </>
  )
}

ProjectFeature.defaultProps = {
  className: ""
}

export default ProjectFeature