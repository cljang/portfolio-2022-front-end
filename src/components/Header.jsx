// import { Link } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import Logo from "./Logo";
import NavMain from "./NavMain";
import { useSelector, useDispatch } from "react-redux"
import { closeNav, toggleNav } from "../features/navOpen/navOpenSlice";

function Header() {
  
  const navOpen = useSelector((state) => state.navOpen.value);
  const dispatch = useDispatch();

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
    <header>
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
