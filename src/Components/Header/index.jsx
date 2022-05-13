import React from 'react'

import './Header.scss';

const Header = () => {
    return (
        <header className="header">
            <nav class="nav-bar secondary-text">
                <div className="nav-bar-wrapper">
                    <a href="/" className="nav-logo-wrapper">
                        <i className="nav-logo"></i>
                        <span className="nav-title secondary-text">My Space</span>
                    </a>

                    <div className="nav-menu-wrapper">
                        <a href="#" className="nav-menu-item secondary-text">Про нас</a>
                        <a href="#" className="nav-menu-item secondary-text">Новини</a>
                        <a href="#" className="nav-menu-item secondary-text">Блог</a>
                        <i className="nav-menu-icon"></i>
                    </div>
                    <a className="menu-button"></a>
                </div>
            </nav>
        </header>
    )

}

export default Header;