import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHome from "../pages/PageHome";
import PageProject from "../pages/PageProject";
import Page404 from "../pages/Page404";

function AppRouter() {
  return (
    <BrowserRouter basename="/">
      <Link to="#site-main" className="screen-reader-text">Skip to content</Link>
      <div className="site-wrapper">
        <Header />
        <main>
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
