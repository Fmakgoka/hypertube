import React from 'react'
import { Link, withRouter } from 'react-router-dom'

function Navbar() {

    const loginRegLink = (
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link to="/login" className="nav-link">
                    Login
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/register" className="nav-link">
                    Register
                </Link>
            </li>
        </ul>

    )

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
            <button className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbar1"
                aria-controls="navbar1"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggle-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-md-center"
                id="navbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            HOME
                        </Link>
                    </li>
                </ul>
                {loginRegLink}
            </div>
        </nav>
        )

}

export default withRouter(Navbar);