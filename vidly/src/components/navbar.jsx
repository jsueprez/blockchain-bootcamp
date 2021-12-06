import React from 'react';
import { NavLink, Link } from 'react-router-dom';


const NavBar = () => {
    return (
        < nav className="navbar navbar-expand-lg navbar-light bg-light mb-4" >
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">Vidly</Link>
                <button className="navbar-toggler" type="button" >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav">
                        <NavLink className="nav-item nav-link" to="/movies">
                            Movies
                        </NavLink>
                        <NavLink className="nav-item nav-link" to="/customers">
                            Customer
                        </NavLink>
                        <NavLink className="nav-item nav-link" to="/rentals">
                            Rentals
                        </NavLink>
                        <NavLink className="nav-item nav-link" to="/login">
                            Login
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav >
    );
}

export default NavBar;