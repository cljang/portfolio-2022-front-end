import { useRef, useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { useSelector, useDispatch } from "react-redux"
import { closeNav, toggleNav } from "../features/navOpen/navOpenSlice";
import Logo from "./Logo";
import NavMain from "./NavMain";

function Header() {
  
  const navOpen = useSelector((state) => state.navOpen.value);
  const dispatch = useDispatch();

  const headerRef = useRef();
  const scrollPosition = useRef();

  useEffect(() => {
    document.addEventListener('scroll', (e) => {
      const threshold = 200;
      const yPos = window.scrollY;
      
      if (yPos >= threshold) {
        headerRef.current.classList.add("background");
      } else {
        headerRef.current.classList.remove("background");
      }

      if (scrollPosition.current) {
        if (yPos < scrollPosition.current) {
          headerRef.current.classList.add("show");
        } else if (yPos > scrollPosition.current) {
          headerRef.current.classList.remove("show");
        }
      }
      
      scrollPosition.current = yPos;
    })
  }, [])

  const handleNavButton = (e) => {
    e.preventDefault();
    dispatch(toggleNav(navOpen))
    document.querySelector("body").classList.toggle("stop-scroll")
  }

  const hideNav = () => {
    dispatch(closeNav())
    document.querySelector("body").classList.remove("stop-scroll")
  }

  return (
    <header ref={headerRef} className="show">
      <div className={"navbar" + (navOpen ? " navbar-toggled" : "")}>
        <div className={"navbar-logo" + (navOpen ? " navbar-toggled" : "")}>
          <Link 
            to="/#home"
            onClick={hideNav}
            smooth
          >
            <Logo />
            <span className="screen-reader-text">Clayton Jang</span>
          </Link>
        </div>
        
        <button
          className={"navbar-btn" + (navOpen ? " navbar-toggled" : "")}
          id="btn-menu"
          aria-label="Navigation Menu"
          aria-controls="header-menu"
          aria-expanded={navOpen}
          onClick={handleNavButton}
        >
          <span className="bar" id="bar-1"></span>
          <span className="bar" id="bar-2"></span>
          <span className="bar" id="bar-3"></span>
        </button>
      </div>
      <NavMain />
    </header>
  );
}

export default Header;
