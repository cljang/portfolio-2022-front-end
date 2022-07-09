// Take an array of image objects from WordPress, assuming they are ordered from 

function ResponsivePicture({imageArray, alt, limitSteps, loading, className, ...props}) { 
  return (
    <picture className={`responsive-picture ${className}`} {...props}>
      {imageArray && imageArray.map((image, id) => {
        if (limitSteps && id < imageArray.length - limitSteps) {
          return null;
        }
        // For the final image in imageArray, output an img tag, otherwise, output a source tag
        if (id + 1 === imageArray.length) {
          return (
            <img 
              key={id}
              src={image.url} 
              alt={alt}
              width={image.width}
              height={image.height}
              loading={loading}
            />
          )
        } else {
          let nextImage = imageArray[id + 1];
          return (
            <source 
              key={id}
              media={`(min-width: ${nextImage.width}px)`} 
              srcSet={image.url} 
              type={image.mime_type ? image.mime_type : ""} 
              width={image.width}
              height={image.height}
            />
          )
        }
      })}
    </picture>
  )
}

ResponsivePicture.defaultProps = {
  className: "",
  alt: "",
  limitSteps: false,
  loading: null
}

export default ResponsivePicture