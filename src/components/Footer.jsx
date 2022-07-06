import Logo from "./Logo";
import Envelope from "./icons/Envelope";
import Github from "./icons/Github";
import Linkedin from "./icons/Linkedin";

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <section className="brand">
          <div className="logo">
            <Logo />
            <h2 className="screen-reader-text">Clayton Jang</h2>
          </div>
          <div className="social-icons">
            <a 
              href="mailto:clayton.jang@gmail.com"
            >
              <Envelope title="Email" />
            </a>
            <a 
              href="https://github.com/cljang/"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Github title="GitHub" />
            </a>
            <a 
              href="https://www.linkedin.com/in/clayton-jang/"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Linkedin title="LinkedIn" />
            </a>
          </div>
        </section>
        <p className="copyright">&copy; {new Date().getFullYear()} Clayton Jang</p>
      </div>
    </footer>
  );
}

export default Footer;
