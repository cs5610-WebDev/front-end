import {Link, useHistory} from "react-router-dom";
import React, {useState, useEffect} from 'react'
import "./top-navbar.css"
import userService from "../../services/user-service";
import {connect} from "react-redux";
import userActions from "../actions/user-actions";

const TopNavBar = ({isLoggedIn={}, loggedInUser={}, logout}) => {

  const history = useHistory()

  const [curUser, setCurUser] = useState(loggedInUser)
  const [usernameCache, setUsernameCache] = useState(JSON.parse(localStorage.getItem("username")) || "")


  useEffect(() => {
    if (loggedInUser) {
      userService.findUserById(curUser._id).then(actualUser => {
            setCurUser(actualUser)
            setUsernameCache(actualUser.userName)
          })
    }


  }, [loggedInUser])

  const handleLogout = () => {
    logout()
    // setCurUser(null)
    history.push("/login")
  }

  return (
        <nav className="navbar navbar-expand-md">
          <div className="container-fluid">

            <a href="/" className="navbar-brand wbdv-brand">KissAnime</a>
            <button className="navbar-toggler" type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo03"
                    aria-controls="navbarTogglerDemo03" aria-expanded="false"
                    aria-label="Toggle navigation">
              <span className="">
                <i className={"fas fa-bars"}></i>
              </span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              </ul>

              {
                !loggedInUser &&
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link
                        className="nav-link wbdv-signup-btn"
                        to="/login">Sign up</Link>
                  </li>
                  <li className="nav-item">
                    <Link
                        className="nav-link wbdv-login-btn text-white btn btn-danger ml-3 pe-3 ps-3"
                        to="/login">Log in</Link>
                  </li>

                </ul>
              }

              {
                loggedInUser &&
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">

                    <div className="btn-group">
                      <Link
                          className="nav-link ml-3 pe-3 ps-3 wbdv-profile-link"
                          to="/profile">
                        <i className="fas fa-user me-2"></i>
                        <span className={""}>{curUser.userName}</span>

                      </Link>
                      <button type="button" className="dropdown-toggle btn dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="visually-hidden">Toggle Dropdown</span>
                      </button>
                      <ul className="dropdown-menu">
                        <li><button
                            onClick={() => handleLogout()}
                            className="nav-link btn dropdown-item">
                          <span >Log out</span>

                        </button></li>
                      </ul>
                    </div>

                  </li>
                </ul>
              }

            </div>
          </div>
        </nav>
  )
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.userReducer.isLoggedIn,
    loggedInUser: state.userReducer.user,
  }
}

const mapDispatchToProps = (dispatch) => ({

  logout: () => {
    userActions.logout(dispatch)
  },

})

export default connect(mapStateToProps, mapDispatchToProps)(TopNavBar)