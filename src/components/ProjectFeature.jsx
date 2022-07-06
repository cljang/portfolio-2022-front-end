import FeatureOverview from './FeatureOverview';
import FeatureContentItem from './FeatureContentItem';

function ProjectFeature({featureObj, className}) {
  return (
    <>
      {featureObj && 
        <section className={`feature ${className}`}>
          {(featureObj.heading || featureObj.description) && 
            <FeatureOverview featureObj={featureObj}/>
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