import React from "react";
import "./Header.scss";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useDispatch, useSelector} from "react-redux";

import logo from "../../images/logo.png";
import {Link} from "react-router-dom";
import {searchProducts} from "../../Redux/Actions/actions";

const Header = () => {
    const allData = useSelector((state) => state.data.dataItems);
    const filterItem = useSelector((state) => state.data.filterItem);
    const dispatch = useDispatch();

    return (
        <div className="main_navbar ">
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <LazyLoadImage
                            src={logo}
                            style={{width: "150px", height: "50px"}}
                            alt="LOGO"
                        />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav flex-grow-1 justify-content-between align-items-center mb-2 mb-lg-0 header-item">
                            <ul className="navbar-nav">
                                <li>
                                    <div>
                                        <Link to="/" className="navbar-links">
                                            Home
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <Link to="/Products" className="navbar-links">
                                            Products
                                        </Link>
                                    </div>
                                </li>
                            </ul>
                            <ul className="navbar-nav align-items-center">
                                <li>
                                    <div className="search-box desktop-view-search">
                                        <button className="btn-search">
                                            <i className="bi bi-search"></i>
                                        </button>
                                        <input
                                            type="text"
                                            className="input-search text-capitalize"
                                            placeholder="Search By Product..."
                                            onChange={(e) => {
                                                dispatch(searchProducts(allData, e.target.value));
                                            }}
                                        />
                                    </div>
                                </li>
                                <li className="d-flex align-items-center cart-link-item">
                                    <Link to="/Cart" className="d-block">
                                        <i className="fa fa-shopping-cart cart-icon"></i>
                                    </Link>
                                    <div
                                        className="cart-item-no"
                                        style={{
                                            fontFamily: "IBM-Semibold",
                                            fontSize: "20px",
                                            color: "#ed1d24",
                                        }}
                                    >
                                        {filterItem.length}
                                    </div>
                                </li>
                            </ul>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Showing Search Bar Out of Dropdown in Mobile and Tablet View*/}

            <div className="search-box mobile-view-search">
                <div>
                    <button className="btn-search">
                        <i className="bi bi-search"></i>
                    </button>
                    <input
                        type="text"
                        className="input-search"
                        placeholder="Search By Product..."
                        onChange={(e) => {
                            dispatch(searchProducts(allData, e.target.value));
                        }}
                    />
                </div>

            </div>
        </div>
    );
};

export default Header;
