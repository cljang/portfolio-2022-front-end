// Component for rendering textarea paragraphs from WordPress - when no formatting is added

function Paragraph({text}) {
  let textArr = text.split("\r\n")
  textArr = textArr.filter((paragraph) => paragraph);
  return (
    <>
      {
        textArr.map((paragraph, id) => {
          return (
            <p key={id}>{paragraph}</p>
          ) 
        })
      }
    </>
  )
}

export default Paragraph