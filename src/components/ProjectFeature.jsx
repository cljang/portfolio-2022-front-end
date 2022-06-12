
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
// import { duotoneSea as codeTheme } from 'react-syntax-highlighter/dist/esm/styles/prism';
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
            <img className="image-content" src={featureContentObj.image.url} alt={featureContentObj.image.alt} />
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