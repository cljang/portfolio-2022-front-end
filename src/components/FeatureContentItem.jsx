import { useState, useRef } from 'react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import codeTheme  from '../global/codeTheme';
import Paragraph from './Paragraph';
import ResponsivePicture from './ResponsivePicture';
import ArrowUp from './icons/ArrowUp';
import ArrowDown from './icons/ArrowDown';

function FeatureContentItem({featureContentObj}) {
  // Allow large code to be collapsed down
  const [codeOpen, setCodeOpen] = useState(false)
  const featureRef = useRef();
  const contentRef = useRef();

  const handleCodeButton = (e) => {
    e.preventDefault();

    if (codeOpen) {
      featureRef.current.scrollIntoView({behavior: "smooth"})
      contentRef.current.style.maxHeight = null;
    } else {
      contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
    }
    setCodeOpen(!codeOpen);
  }

  // Function to handle how different types of feature content is rendered
  const renderFeatureContent = (featureContentObj) => {
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
              ref={contentRef}
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
                <div className='code-fog'></div>
                <button
                  className='code-button'
                  onClick={handleCodeButton}
                >
                  {codeOpen ? 
                    <>
                      <ArrowUp aria-hidden/> <span>Collapse Code</span>
                    </>
                  : 
                    <>
                      <ArrowDown aria-hidden /> <span>Expand Code</span>
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
              <source 
                src={featureContentObj.video.url} 
                type={featureContentObj.video.mime_type} 
                width={featureContentObj.video.width}
                height={featureContentObj.video.height}
              />
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
      {featureContentObj.caption ? 
        <figure
          className="feature-content-item"
          ref={featureRef}
        >
          {featureContentObj && renderFeatureContent(featureContentObj)}
          <figcaption>{featureContentObj.caption}</figcaption>
        </figure>
      :
        <div
          className="feature-content-item"
          ref={featureRef}
        >
          {featureContentObj && renderFeatureContent(featureContentObj)}
        </div>
      } 
    </>
  )
}

export default FeatureContentItem