import React, { useState, useEffect } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';

import img from '../../assets/images/logo/log-footer.png'
import img1 from '../../assets/images/logo/logo-footer-dark.png'



function Footer(props) {

    const [productLink] = useState([
        {
            title: 'Pools',
            path: '/'
        },
        {
            title: 'Tokens',
            path: '/token'
        },
        {
            title: 'Transactions',
            path: '/transaction'
        }
    ]);

    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (

        <footer className="footer style-2">
            <div className="container">
                <div className="footer__main">
                    <div className="row">
                        <div className="col-xl-6 col-md-6">
                            <div className="info">
                                <Link to="/" className="logo light">
                                    <img src={img} alt="" width="36px" />
                                </Link>
                                <Link to="/" className="logo dark">
                                    <img src={img1} alt="" width="36px" />
                                </Link>
                                <h6>Let's talk! 🤙</h6>
                                <ul className="list">
                                    <li><p>+1 206 809 0183</p></li>
                                    <li><p>cookies941217@gmail.com</p></li>
                                    <li>
                                        <p>
                                            738 Indigo Ave, Orlando, FL 32828
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-6">
                            <div className="widget">
                                <div className="widget-link">
                                    <h6 className="title">Pages</h6>
                                    <ul>
                                        {
                                            productLink.map((data, idx) => (
                                                <li key={idx}><Link to={data.path}>{data.title}</Link></li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="footer__bottom">
                    <p>
                        ©2023 Coding Challenge (Edwin Collins). All rights reserved. Terms of Service | Privacy Terms
                    </p>
                </div>
            </div>

            {
                isVisible &&
                <Link onClick={scrollToTop} to='#' id="scroll-top"></Link>
            }
        </footer>
    );
}

export default Footer;