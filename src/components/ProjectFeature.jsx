
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import codeTheme  from '../global/codeTheme';

function ProjectFeature({featureObj, className}) {

  const renderFeatureContent = (featureContentObj) => {
    if (featureContentObj) {
      switch (featureContentObj.acf_fc_layout) {
        case "text_content":
          return (
            <div 
              className="text-content"
              dangerouslySetInnerHTML={{__html: featureContentObj.text}} 
            />
          );
        
        case "image_content":
          return (
            <picture className="image-content">
              {featureContentObj.image_sources && featureContentObj.image_sources.map((image, id) => {
                // For the final image in image_sources array, output an img tag, otherwise, output a source tag
                if (id + 1 === featureContentObj.image_sources.length) {
                  return (
                    <img 
                      key={id}
                      src={image.url} 
                      alt={featureContentObj.alt} 
                      loading="lazy" 
                    />
                  )
                } else {
                  let nextImage = featureContentObj.image_sources[id + 1];
                  return (
                    <source 
                      key={id}
                      media={`(min-width: ${nextImage.width}px)`} 
                      srcSet={image.url} 
                      type={image.mime_type} 
                    />
                  )
                }
              })}
            </picture>
          );

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
              <SyntaxHighlighter 
                language={featureContentObj.language} 
                style={codeTheme}
                showLineNumbers={true}
              >
                {featureContentObj.code}
              </SyntaxHighlighter>
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
          <h3 className="project-feature-heading">{featureObj.feature_heading}</h3>
          {featureObj.feature_content.map((featureContentObj, id) => {
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