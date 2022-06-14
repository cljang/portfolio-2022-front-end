// Component for rendering textarea paragraphs from WordPress - when no formatting is added

function Paragraph({text, className}) {
  let textArr = text.split("\r\n")
  textArr = textArr.filter((paragraph) => paragraph);
  return (
    <>
      {
        textArr.map((paragraph, id) => {
          return (
            <p key={id} className={className}>{paragraph.trim()}</p>
          ) 
        })
      }
    </>
  )
}

Paragraph.defaultProps = {
  text: "",
  className: "",
}

export default Paragraph