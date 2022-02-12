import React, { useEffect, useState } from "react";
import "./Content.scss";
import { toast, ToastContainer } from "react-toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import SkeletonContent from "../SkeletonView/SkeletonContent";
import noitem from "../../images/no-item.png";

import {
  fetchApiData,
  addtoCart,
  filterProducts,
  detailPage,
  allProducts,
  sortItems,
} from "../../Redux/Actions/actions";
import { Link } from "react-router-dom";

const Content = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  /* Loading Skeleton View */

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    // Cancel the timer while unmounting
    return () => clearTimeout(timer);
  }, []);

  /* Fetching data from json  using redux*/

  useEffect(() => {
    dispatch(fetchApiData());
  }, [dispatch]);

  const allData = useSelector((state) => state.data.dataItems);
  const categoryItems = useSelector((state) => state.data.categoryItems);

  return (
    <div className=" main_container content-container">
      {loading && <SkeletonContent />}
      {!loading && (
        <React.Fragment>
          {/*Filtering Items By Category*/}

          <div className="d-flex mt-5 align-items-center item-navbar ">
            <div className="hero-title">Our Products</div>
            <div className="d-flex flex-grow-1 justify-content-between items">
              <ul className="d-flex flex-grow-1 justify-content-between">
                <li>
                  <button onClick={() => dispatch(allProducts(allData))}>
                    All
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => dispatch(filterProducts(allData, "Fruits"))}
                  >
                    Fruits
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      dispatch(filterProducts(allData, "Vegetables"))
                    }
                  >
                    Vegetables
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => dispatch(filterProducts(allData, "Dairy"))}
                  >
                    Dairy
                  </button>
                </li>
                <li>
                  <button
                      className='pe-3'
                    onClick={() => dispatch(filterProducts(allData, "Grains"))}
                  >
                    Grains
                  </button>
                </li>
              </ul>
            </div>
          </div>
          {/* Filtering Items by Price */}
          <div className="d-flex mt-5 align-items-center filterbyprice">
            <h2 className="hero-title">Filter by Price</h2>
            <ul className="d-flex">
              <li>
                <button
                  className="filter-buttons"
                  onClick={() =>
                    dispatch(sortItems(categoryItems, "lowestprice"))
                  }
                >
                  Low to High
                </button>
              </li>
              <li>
                <button
                  className="filter-buttons"
                  onClick={() =>
                    dispatch(sortItems(categoryItems, "highestprice"))
                  }
                >
                  High to Low
                </button>
              </li>
            </ul>
          </div>
          <div className="row mt-5 ">
            {/* Mapping Data in Form of Card */}
            {categoryItems?.length > 0 ? (
              categoryItems.map((data) => {
                return (
                  <div className="col-md-3" key={data.product_id}>
                    <div className="max-w-sm w-full sm:w-1/2 lg:w-1/3 py-4 px-3 card-width">
                      <div className="bg-white cards">
                        <Link
                          to="/Detail"
                          onClick={() =>
                            dispatch(detailPage(allData, data.product_id))
                          }
                        >
                          <div className="d-flex justify-content-center">
                            <LazyLoadImage
                              effect="blur"
                              className="product-image"
                              src={data.product_image}
                              alt={data.product_name}
                            />
                          </div>
                        </Link>
                        <div className="p-2 text-center">
                          <Link
                            to="/Detail"
                            onClick={() =>
                              dispatch(detailPage(allData, data.product_id))
                            }
                          >
                            <p className="product-title">{data.product_name}</p>
                          </Link>
                          <p>
                            ₹ <span>{data.product_price}</span>
                          </p>
                        </div>
                        <button
                          className="buy--btn d-block mx-auto mb-3"
                          onClick={() => {
                            dispatch(addtoCart(allData, data.product_id));
                            toast.success(`${data.product_name} Added to Cart`);
                          }}
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                <div className="mx-auto">
                  <div className="max-w-sm w-full sm:w-1/2 lg:w-1/3 py-4 px-3 ">
                    <div className=" cards">
                      <div className="text-center">
                        <h1
                          style={{
                            fontFamily: "IBM-Semibold",
                            color: "#4682b4",
                          }}
                        >
                          Sorry, No result found :(
                        </h1>
                      </div>
                      <div className="d-flex justify-content-center">
                        <LazyLoadImage
                          effect="blur"
                          className="product-image"
                          style={{ width: "300px", height: "300px" }}
                          src={noitem}
                        />
                      </div>
                      <ul className="text-center mt-3">
                        <h4>Search Suggestions:</h4>
                        <li>* Make sure the product is spelled correctly</li>
                        <li>* Replace abbreviations with the entire word</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default Content;
