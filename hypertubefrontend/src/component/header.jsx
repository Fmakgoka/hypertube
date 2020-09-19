import React from 'react'



function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <p className="navbar-brand">HyperTube</p>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="http://localhost:3000/homepage">Home<span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="http://localhost:3000/profile">Profile<span className="sr-only">(current)</span></a>
                    </li>
                    
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">search</button>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit"><a href='http://localhost:9000/auth/logout'>logout</a></button>
                   </form>


             </div>
        </nav>
    )
}

export default Header