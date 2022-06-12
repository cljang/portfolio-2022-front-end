import { useEffect } from "react"
import { appTitle } from "../global/globals"

const PageHome = () => {

  // On mount: 
  //    Set document title
  //    Scroll back to the top
  useEffect(() => {
    document.title = `${appTitle}`
    window.scrollTo(0, 0); 
  }, [])


  return (
    <section className="page page-home">
      <h1>Home</h1>
    </section>
  );

};

export default PageHome;