import React from 'react'
import './header-styles.css';

const Header = () => {
    return(
        <div className = 'header'>
            <a href = '/administrator' className="btn btn-primary btn-lg active options">Admin</a>
            <a href = '/scoreboard' className="btn btn-primary btn-lg active options">Scoreboard</a>
            <a href = '/specialists' className="btn btn-primary btn-lg active options">Specialists</a>
            <a href = '/client' className="btn btn-primary btn-lg active options">Client</a>
        </div>
    )
}
export default Header;