import React from "react";
import { addtoCart } from "../../Redux/Actions/actions";
import { toast, ToastContainer } from "react-toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Detail.scss";

const Detail = () => {
  const allData = useSelector((state) => state.data.dataItems);
  const itemDetail = useSelector((state) => state.data.detailItem);
  const dispatch = useDispatch();

  return (
    <div className="main-detail-page">
      <div className=" mx-auto detail-container">
        {itemDetail.map((value) => {
          return (
            <section
              className="product detail-page d-flex"
              key={value.product_id}
            >
              <div className="product__photo">
                <div className="photo-container">
                  <div className="photo-main">
                    <LazyLoadImage
                      src={value.product_image}
                      alt={value.product_name}
                    />
                  </div>
                </div>
              </div>
              <div className="product__info">
                <div className="title">
                  <h1>{value.product_name}</h1>
                </div>
                <div className="price">
                  ₹ <span>{value.product_price}</span>
                </div>
                <div className="description">
                  <h3>BENEFITS</h3>
                  <p>{value.product_desc}</p>
                </div>
                <div className=" buttons">
                  <button
                    className="buy--btn"
                    onClick={() => {
                      dispatch(addtoCart(allData, value.product_id));
                      toast.success("Added to Cart", { autoClose: 1500 });
                    }}
                  >
                    Add to Cart
                  </button>
                  <Link className="buy--btn" to="/Products">
                    Back to Products
                  </Link>
                </div>
              </div>
            </section>
          );
        })}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
};

export default Detail;
