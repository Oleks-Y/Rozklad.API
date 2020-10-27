import React, { CSSProperties } from "react";
import { Link, NavLink } from "react-router-dom";
import { restApiUrl } from "../../../shared/urls";

function Navbar() {
  const navStyle: CSSProperties = {
    height: "80px",
    backgroundColor: "#37434d",
    color: "#ffffff",
  };
  const navItemStyle: CSSProperties = {
    color: "#ffffff",
  };
  return (
    <nav
      className="navbar navbar-light navbar-expand-md sticky-top bg-primary navigation-clean-button"
      style={navStyle}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <i className="fa fa-table" />
          &nbsp;Rozklad
        </a>
        <button
          data-toggle="collapse"
          className="navbar-toggler"
          data-target="#navcol-1"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navcol-1">
          <ul className="nav navbar-nav ml-auto">
            <li className="nav-item" role="presentation">
              <Link
                to={`/site/home`}
                className="nav-link active"
                style={navItemStyle}
              >
                <i className="fa fa-home" />
                &nbsp;Home
              </Link>
            </li>
            <li className="nav-item" role="presentation">
              <Link
                to="site/timetable"
                className="nav-link active"
                style={navItemStyle}
              >
                <i className="fa fa-calendar" />
                &nbsp;Rozklad
              </Link>
            </li>
            <li className="nav-item" role="presentation">
              <a className="nav-link active" style={navItemStyle} href="#">
                <i className="fa fa-fire-alt" />
                &nbsp;Deadlines
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a className="nav-link active" style={navItemStyle} href="#">
                <i className="fa fa-list-alt" />
                &nbsp;Subjects
              </a>
            </li>
            <li>
              <i className="fas fa-sign-out-alt" />
            </li>
            {/*<li className="nav-item" role="presentation">*/}
            {/*    <a className="nav-link active" style={navItemStyle} href="#">*/}
            {/*        <i className="fas fa-fire-alt"></i>*/}
            {/*        &nbsp;Deadlines&nbsp;*/}
            {/*    </a><a className="nav-link active"*/}
            {/*                                                                style={navItemStyle}*/}
            {/*                                                                href="#"><i*/}
            {/*    className="far fa-list-alt"></i>&nbsp;Subjects</a></li>*/}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
