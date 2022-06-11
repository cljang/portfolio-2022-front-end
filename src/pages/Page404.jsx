import { useEffect } from "react";
import { appTitle } from "../global/globals";

const Page404 = () => {
  
  // On mount: 
  //    Set document title
  //    Scroll back to the top
  useEffect(() => {
    document.title = `404 - ${appTitle}`;
    window.scrollTo(0, 0);
  }, [])

  return (
      <section className="page page-404">
        <h2>404</h2>
      </section>
  );

};

export default Page404;