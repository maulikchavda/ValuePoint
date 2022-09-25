import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  removeCart,
  addtoCart,
  removefromCart,
} from "../../redux/Actions/actions";
import { Link } from "react-router-dom";
import "./Cart.scss";
import emptyCart from "../../utils/images/empty-cart.jpg";
const Cart = () => {
  const filterItem = useSelector((state) => state.data.filterItem);
  const dispatch = useDispatch();

  return (
    <div className="main-cart-page">
      <div className="cart-page row container mx-auto">
        <h1 className="d-flex justify-content-center title">Shopping Cart</h1>
        {/* Checking that cart is empty or not */}
        {filterItem.length === 0 ? (
          <div>
            <LazyLoadImage
              src={emptyCart}
              className="empty-cart-image"
              alt="Empty"
            />
            <Link className="buy--btn  link mt-4" to="/Products">
              Continue Shopping
            </Link>
          </div>
        ) : (
          /* Mapping Items in cart */

          filterItem.map((value) => {
            return (
              <section className="shopping-cart" key={value.product_id}>
                <ol
                  className="ui-list shopping-cart--list"
                  id="shopping-cart--list"
                >
                  <li className="_grid shopping-cart--list-item">
                    <div className="_column product-image">
                      <LazyLoadImage src={value.product_image} alt="Item" />
                    </div>
                    <div className="_column product-info">
                      <h4 className="product-name">{value.product_name}</h4>
                      <div className="price product-single-price mt-3">
                        ₹ <span>{value.product_price}</span>
                      </div>
                    </div>
                    <div className="_column product-modifiers">
                      <div className="_grid product-quantity">
                        <button
                          className="_btn _column product-subtract"
                          onClick={() => {
                            value.qty === 1
                              ? dispatch(
                                  removeCart(filterItem, value.product_id)
                                )
                              : dispatch(
                                  removefromCart(filterItem, value.product_id)
                                );
                          }}
                        >
                          -
                        </button>
                        <div className="_column product-qty">{value.qty}</div>
                        <button
                          className="_btn _column product-plus"
                          onClick={() =>
                            dispatch(addtoCart(filterItem, value.product_id))
                          }
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="product-remove buy--btn"
                        onClick={() => {
                          dispatch(removeCart(filterItem, value.product_id));
                          toast.success("Removed from Cart");
                        }}
                      >
                        Remove Item
                      </button>
                      <div className="price product-total-price">
                        ₹ <span>{value.product_price * value.qty}</span>
                      </div>
                    </div>
                  </li>
                </ol>
              </section>
            );
          })
        )}
        {/* Calculating Final Total of Cart */}
        {filterItem.length === 0 ? null : (
          <footer className="_grid cart-totals">
            <div className="_column total" id="totalCtr">
              <div className="cart-totals-key">Total</div>
              <div className="cart-totals-value">
                ₹
                {filterItem.reduce(
                  (acc, item) => (acc += item.product_price * item.qty),
                  0
                )}
              </div>
            </div>
            <div className="_column checkout">
              <Link to="/Checkout" className="buy--btn">
                Place Order
              </Link>
            </div>
          </footer>
        )}
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
      </div>
    </div>
  );
};

export default Cart;
