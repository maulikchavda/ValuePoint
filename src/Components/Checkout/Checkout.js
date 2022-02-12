import React, { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { emptyCart } from "../../Redux/Actions/actions";
import { Link } from "react-router-dom";
import "./Checkout.scss";
const Checkout = () => {
  const filterItem = useSelector((state) => state.data.filterItem);
  const dispatch = useDispatch();

  const formRef = useRef(null);

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const [show, setShow] = useState(false);

  const handleClose = () => {
    handleReset();
    setShow(false);
  };
  const handleShow = () => {
    const newError = findFormError();
    if (Object.keys(newError).length > 0) {
      setErrors(newError);
    } else {
      setShow(true);
    }
  };

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    // Check and see if errors exist, and remove them from the error object:
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const findFormError = () => {
    const { name, email } = form;
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    const newError = {};
    if (!name || name === "") {
      newError.name = "Please Enter Name";
    } else if (name.length < 2) {
      newError.name = "Name is too short";
    }
    if (!email || email === "") {
      newError.email = "Please Enter Email";
    } else if (!pattern.test(email)) {
      newError.email = "Please enter a valid email";
    }

    return newError;
  };

  const handleReset = () => {
    formRef.current.reset();
  };

  return (
    <div className="checkout container mx-auto mt-5">
      <div className="row">
        <div className="col-50">
          <div className="container">
            <Form ref={formRef}>
              <div className="row">
                <div className="col-50">
                  <h3 className="mb-3">Billing Address</h3>
                  <Form.Group>
                    <Form.Label>
                      <i className="fa fa-user"></i> Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setField("name", e.target.value)}
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="my-5">
                    <Form.Label>
                      <i className="fa fa-envelope"></i> Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      onChange={(e) => setField("email", e.target.value)}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>
                      <i className="fa fa-address-card-o"></i> Address
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setField("address", e.target.value)}
                    />
                  </Form.Group>
                </div>
              </div>
            </Form>
            <div>
              <Button variant="primary" onClick={handleShow}>
                Checkout
              </Button>
            </div>
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                  <Modal.Title>Order Summary</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h2 className="text-center mb-5" style={{ color: "green" }}>
                    Order Placed Succesfully
                  </h2>
                  <div className="mb-4">
                    <h4 className="mb-3">Personal Detail</h4>
                    <h5 className="mb-3">Name - {form.name}</h5>
                    <p>Email - {form.email}</p>
                  </div>
                  <table className="w-100">
                    <tbody>
                      <tr className="d-flex ">
                        <th style={{ width: "33.33%" }} className="text-left">
                          Product
                        </th>
                        <th style={{ width: "33.33%" }} className="text-center">
                          Quantity
                        </th>
                        <th style={{ width: "33.33%" }} className="text-center">
                          Amount
                        </th>
                      </tr>
                      {filterItem.map((value) => {
                        return (
                          <tr
                            className="d-flex w-100 mt-2"
                            key={value.product_id}
                          >
                            <td style={{ width: "33.33%" }}>
                              {value.product_name}
                            </td>
                            <td
                              style={{ width: "33.33%" }}
                              className="text-center"
                            >
                              {value.qty}
                            </td>
                            <td
                              className="price text-center"
                              style={{ width: "33.33%" }}
                            >
                              ₹{value.product_price * value.qty}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <p className="mt-4 mb-0  d-flex">
                    <span style={{ width: "80%" }}>Total</span>
                    <span
                      className="price"
                      style={{ color: "black", width: "20%" }}
                    >
                      <b>
                        ₹
                        {filterItem.reduce(
                          (acc, item) => (acc += item.product_price * item.qty),
                          0
                        )}
                      </b>
                    </span>
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Link
                    to="/"
                    variant="secondary"
                    onClick={() => {
                      handleClose();
                      dispatch(emptyCart());
                    }}
                  >
                    Close
                  </Link>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
        <div className="col-25">
          <div className="container">
            <h4>
              Cart
              <span className="price" style={{ color: "black" }}>
                <i className="fa fa-shopping-cart"></i>{" "}
                <b>{filterItem.reduce((acc, item) => (acc += item.qty), 0)}</b>
              </span>
            </h4>
            <table className="w-100">
              <tbody>
                <tr className="d-flex mt-3">
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
                {filterItem.map((value) => {
                  return (
                    <tr className="d-flex w-100  mt-2" key={value.product_id}>
                      <td>{value.product_name}</td>
                      <td>{value.qty}</td>
                      <td className="price">
                        ₹{value.product_price * value.qty}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="mt-4 mb-0  d-flex">
              <span style={{ width: "80%" }}>Total</span>
              <span className="price" style={{ color: "black", width: "20%" }}>
                <b>
                  ₹
                  {filterItem.reduce(
                    (acc, item) => (acc += item.product_price * item.qty),
                    0
                  )}
                </b>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
