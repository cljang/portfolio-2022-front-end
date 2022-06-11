import { useEffect } from "react";
import { appTitle } from "../global/globals";

const PageAbout = () => {
  
  // On mount: 
  //    Set document title
  //    Scroll back to the top
  useEffect(() => {
    document.title = `About - ${appTitle}`;
    window.scrollTo(0, 0);
  }, [])

  return (
      <section className="page page-about">
        <h2>About</h2>
      </section>
  );

};

export default PageAbout;