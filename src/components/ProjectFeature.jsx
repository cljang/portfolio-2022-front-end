import { useState, useRef, useEffect } from 'react';
import Paragraph from './Paragraph';

import FeatureContentItem from './FeatureContentItem';

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
                <FeatureContentItem key={id} featureContentObj={featureContentObj}/>
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