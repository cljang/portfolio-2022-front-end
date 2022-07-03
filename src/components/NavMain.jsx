import { HashLink as NavLink } from "react-router-hash-link"
import { useSelector, useDispatch } from "react-redux"
import { navMainLinks } from "../global/globals";
import { closeNav } from "../features/navOpen/navOpenSlice"
function NavMain({ reference }) {

  const navOpen = useSelector((state) => state.navOpen.value);
  
  const dispatch = useDispatch()

  const hideNav = () => {
    dispatch(closeNav())
    document.querySelector("body").classList.remove("stop-scroll")
  }

  return (
    <div className={"navbar-menu" + (navOpen ? " navbar-toggled" : "")} ref={reference}>
      <nav >
        <ul>
          {navMainLinks.map(link => {
            return(
              <li key={link.name}>
                <NavLink 
                  to={link.path}
                  onClick={hideNav}
                  tabIndex={navOpen ? 0 : -1}
                  smooth
                >
                  {link.name}
                  <div className="underline"></div>
                </NavLink>
              </li>
            )
            })}
        </ul>
      </nav>
      <div className="navbar-curtain"></div>
    </div>
  )
}

export default NavMain