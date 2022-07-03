import { useEffect } from "react";
import { Link } from "react-router-dom";
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
        <div className="page-content">
          <h1>404</h1>
          <p>Seems like you got a bit lost, this page doesn't exist.</p>
          <Link to="/">Back to Home Page</Link>
        </div>
      </section>
  );

};

export default Page404;