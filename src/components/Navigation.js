import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import "../assets/styles/Navigation.scss";
import logo from "../assets/images/logo.png";

import Context from "../context";
import Signin from "./Auth/Signin";

export default function Navigation(props) {
    const context = useContext(Context);
    const { dispatch } = useContext(Context);
    const onSignout = () => {
        dispatch({
            type: "SIGNOUT_USER"
        });
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("login");
    };

    return (
        <div className="">
            <nav className="navigation navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img className="logo" src={logo} alt="logo" />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav mr-auto">
                            {context.state.isAuth ? (
                                <a
                                    className="nav-link"
                                    href="#test"
                                    onClick={e => e.preventDefault()}
                                >
                                    Logged in as:{" "}
                                    <span className="logged-as-name">
                                        {context.state.login}
                                    </span>
                                </a>
                            ) : null}
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/posts"
                                    activeClassName="active"
                                >
                                    Posty{" "}
                                    <span className="sr-only">(current)</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/about"
                                    activeclassname="active"
                                >
                                    O nas
                                </NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    to="/"
                                    id="navbarDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Opcje
                                </Link>
                                <div
                                    className="dropdown-menu"
                                    aria-labelledby="navbarDropdown"
                                >
                                    <Link className="dropdown-item" to="/">
                                        Action
                                    </Link>
                                    {context.state.isAuth ? (
                                        <Link
                                            className="dropdown-item"
                                            to="/panel"
                                        >
                                            Panel
                                        </Link>
                                    ) : null}
                                    <div className="dropdown-divider" />
                                    {!context.state.isAuth ? (
                                        <button
                                            className="dropdown-item"
                                            to="/"
                                            data-toggle="modal"
                                            data-target="#loginModal"
                                            onClick={e => e.preventDefault()}
                                        >
                                            Zaloguj
                                        </button>
                                    ) : (
                                        <button
                                            className="dropdown-item"
                                            onClick={onSignout}
                                        >
                                            Wyloguj
                                        </button>
                                    )}
                                </div>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input
                                className="form-control mr-sm-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button
                                className="btn btn-outline-success my-2 my-sm-0"
                                type="submit"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>
                <Signin />
            </nav>
        </div>
    );
}
