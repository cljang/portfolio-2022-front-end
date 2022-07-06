import { useState, useRef } from 'react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import codeTheme  from '../global/codeTheme';
import Paragraph from './Paragraph';
import ResponsivePicture from './ResponsivePicture';
import {FaArrowDown, FaArrowUp} from "react-icons/fa"

function FeatureContentItem({featureContentObj}) {

  // Allow large code to be collapsed down
  const [codeOpen, setCodeOpen] = useState(false)
  const featureRef = useRef();

  const handleCodeButton = (e) => {
    e.preventDefault();

    if (codeOpen) {
      featureRef.current.style.maxHeight = null;
    } else {
      featureRef.current.style.maxHeight = `${featureRef.current.scrollHeight}px`;
    }
    setCodeOpen(!codeOpen);
  }

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
              className={`code-content ${codeOpen ? "code-open" : "code-closed"}`} 
              ref={featureRef}
            >
              { featureContentObj.code && 
              <>
                <SyntaxHighlighter 
                  language={featureContentObj.language} 
                  style={codeTheme}
                  showLineNumbers={true}
                >
                  {featureContentObj.code}
                </SyntaxHighlighter>
                <button
                  className='code-button'
                  onClick={handleCodeButton}
                >
                  {codeOpen ? 
                    <>
                      <FaArrowUp aria-hidden/> 
                      <span>Collapse Code</span>
                    </>
                  : 
                    <>
                      <FaArrowDown aria-hidden />
                      <span>Expand Code</span>
                    </>
                  }
                </button>
              </>
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
    <div
      className="feature-content-item"
    >
      {featureContentObj && renderFeatureContent(featureContentObj)}
    </div>
  )
}

export default FeatureContentItem