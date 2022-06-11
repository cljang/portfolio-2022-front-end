import { Link } from "react-router-dom";
import Logo from "./Logo";
import NavMain from "./NavMain";
import { useSelector, useDispatch } from "react-redux"
import { toggleNav } from "../features/navOpen/navOpenSlice";

function Header() {
  
  const navOpen = useSelector((state) => state.navOpen.value);
  const dispatch = useDispatch();

  const handleNavButton = (e) => {
    e.preventDefault();
    dispatch(toggleNav(navOpen))
  }

  return (
    <header>
      <div className="navbar">
        <div className="navbar-logo">
          <Link to="/">
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
