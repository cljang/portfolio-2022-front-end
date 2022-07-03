import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { setProjectData, setLoaded } from "../features/projectData/projectDataSlice";
import { apiPath_projects } from "../global/globals";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHome from "../pages/PageHome";
import PageProject from "../pages/PageProject";
import Page404 from "../pages/Page404";

function AppRouter() {

  // Get project data on load
  const projectsPath = `${apiPath_projects}`
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(projectsPath)
      if ( response.ok ) {
        const data = await response.json()
        dispatch(setProjectData(data));
        dispatch(setLoaded(true));
      } else {
        dispatch(setLoaded(false));
      }
    }
    fetchData()
    console.log("Fetched Projects");
    
  }, [projectsPath, dispatch])

  return (
    <BrowserRouter basename="/">
      <Link to="#site-main" className="screen-reader-text">Skip to content</Link>
      <div className="site-wrapper">
        <Header />
        <main id="site-main">
          <Routes>
              <Route path="/" element={<PageHome />} />
              <Route path="/projects/:project_slug" element={<PageProject />} />
              <Route path="*" element={<Page404 />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;
