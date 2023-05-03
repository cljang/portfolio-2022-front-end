import { useEffect } from "react";
import { appTitle } from "../global/globals";

const PageMaintenance = () => {
  // On mount:
  //    Set document title
  //    Scroll back to the top
  useEffect(() => {
    document.title = `Site Under Maintenance - ${appTitle}`;
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="page page-maintenance">
      <div className="page-content">
        <h1>Oops I broke my portfolio...</h1>
        <p>
          I am making some maintenance changes to the site. Come back another
          time when it is less broken.
        </p>
      </div>
    </section>
  );
};

export default PageMaintenance;
