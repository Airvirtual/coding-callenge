import React, { useState, useEffect } from 'react';

import { Link, NavLink } from 'react-router-dom';
import menus from '../../pages/menu';

import './styles.scss';
import logo from '../../assets/images/logo/logo.png';
import logodark from '../../assets/images/logo/logo-dark.png';
import DarkMode from './DarkMode';

const Header = () => {

    const [scroll, setScroll] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 300);
        });
        return () => {
            setScroll({});
        }
    }, []);

    const [menuActive, setMenuActive] = useState(null);

    const handleMenuActive = () => {
        setMenuActive(!menuActive);
    };

    const [activeIndex, setActiveIndex] = useState(null);
    const handleDropdown = index => {
        setActiveIndex(index);
    };

    return (
        <header id="header_main" className={`header ${scroll ? 'is-fixed' : ''}`}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="header__body d-flex justify-content-between">
                            <div className="header__left">
                                <div className="logo">
                                    <NavLink to='/' className="light">
                                        <img
                                            src={logo}
                                            alt="Logo"
                                            width="36px"
                                        />
                                    </NavLink>
                                    <NavLink to='/' className="dark">
                                        <img
                                            src={logodark}
                                            alt="Logo"
                                            width="36px"
                                        />
                                    </NavLink>
                                </div>
                                <div className="left__main">
                                    <nav id="main-nav" className={`main-nav ${menuActive ? 'active' : ''}`}>
                                        <ul id="menu-primary-menu" className="menu">
                                            {
                                                menus.map((data, idx) => (
                                                    <li key={idx} onClick={() => handleDropdown(idx)} className={`menu-item ${activeIndex === idx ? 'active' : ''}`}>
                                                        <Link to={data.links}>{data.name}</Link>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </nav>


                                </div>
                            </div>

                            <div className="header__right">
                                <DarkMode />
                                <div className={`mobile-button ${menuActive ? 'active' : ''}`} onClick={handleMenuActive}><span></span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

    );
}

export default Header;