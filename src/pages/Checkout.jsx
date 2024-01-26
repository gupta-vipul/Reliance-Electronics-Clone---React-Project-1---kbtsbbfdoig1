import React, { useContext, useEffect, useState } from "react";
import IsAuth from "../components/IsAuth/IsAuth";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { Close, ExpandMore } from "@mui/icons-material";
import { createPortal } from "react-dom";
import { checkoutFormData } from "../Constants/data";
import AddressCard from "../components/AddressCard/AddressCard";
import { GET_CART_ITEMS } from "../Constants/APIs";
import PaymentGateway from "../components/Payment/PaymentGateway";
// import { AuthContext } from '../Context/AuthContext';

function Checkout() {
  // const {userDetails} = useContext(AuthContext);
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [orderDetailsTab, setOrderDetailsTab] = useState(true);
  const [paymentGatewayTab, setPaymentGatewayTab] = useState(true);
  const [addressCardDetails, setAddressCardDetails] = useState({});
  const [cartData, setCartData] = useState({});
  const [userAddress, setUserAddress] = useState({
    zipCode: "",
    firstname: "",
    lastname: "",
    flatno: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    mobileno: "",
    landlineno: "",
    country: "",
  });

  function getDatafromLS() {
    const addressInLs = JSON.parse(localStorage.getItem("addresses"));
    setAddressCardDetails(addressInLs);
  }
  async function showCartProducts() {
    try {
      const response = await fetch(GET_CART_ITEMS, {
        headers: {
          projectID: "kbtsbbfdoig1",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const jsonData = await response.json();
      setCartData(jsonData);
    } catch (error) {
      console.log(error);
    }
  }

  function addNewAddress(e) {
    e.preventDefault();
    let addressInLS = JSON.parse(localStorage.getItem("addresses"));
    const newAddress = { ...userAddress };
    const formData = new FormData(e.currentTarget);
    formData.forEach((value, key) => {
      newAddress[key] = value;
    });
    addressInLS = [];
    if (!addressInLS) {
      addressInLS.push(newAddress);
      localStorage.setItem("addresses", JSON.stringify(addressInLS));
      setOpenAddressModal(false);
      setUserAddress(newAddress);
    } else {
      let updatedAddress = [...addressInLS];
      updatedAddress.push(newAddress);
      localStorage.setItem("addresses", JSON.stringify(updatedAddress));
      setOpenAddressModal(false);
      setUserAddress(newAddress);
    }
  }

  function handleCheckoutCancelBtn(e) {
    e.preventDefault();
    setOpenAddressModal(false);
  }
  function handleAddressConfirmationBtn() {
    setOrderDetailsTab(false);
    showCartProducts();
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getDatafromLS();
  }, [userAddress]);

  return (
    <div className="checkout-page">
      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography sx={{ fontWeight: "650", textTransform: "uppercase" }}>
            Shipping Address
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {!addressCardDetails ? (
            <div className="no-address-checkout-page">
              There are no save addresses.
            </div>
          ) : (
            <AddressCard cardDetails={addressCardDetails[0]} />
          )}
          <div className="address-controls">
            {addressCardDetails ? (
              <Button
                variant="contained"
                sx={{ fontSize: "0.8rem" }}
                onClick={handleAddressConfirmationBtn}
              >
                Deliver Here
              </Button>
            ) : null}
            <Button
              variant="outlined"
              sx={{ fontSize: "0.8rem" }}
              onClick={() => setOpenAddressModal(true)}
            >
              add new shipping address
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled={orderDetailsTab}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography sx={{ fontWeight: "650", textTransform: "uppercase" }}>
            order details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="final-cart-review">
            <ul>
              {cartData?.data?.items &&
                Array.isArray(cartData.data.items) &&
                cartData.data.items.map(({ product, quantity }) => {
                  return (
                    <li key={product._id}>
                      <div>{product.name}</div>
                      <div style={{ textAlign: "right" }}>Qty: {quantity}</div>
                      <div style={{ textAlign: "right" }}>₹{product.price}</div>
                    </li>
                  );
                })}
            </ul>
            <div className="final-cart-totalPrice">
              <div className="final-cart-totalPrice-tag">Total:</div>
              <div className="final-cart-totalPrice-price">
                ₹{cartData?.data?.totalPrice}
              </div>
            </div>
          </div>
          <div className="cart-details-control">
            {paymentGatewayTab ? (
              <Button
                variant="contained"
                sx={{ fontSize: "0.8rem" }}
                onClick={() => setPaymentGatewayTab(false)}
              >
                proceed to payment
              </Button>
            ) : null}
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled={paymentGatewayTab}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography sx={{ fontWeight: "650", textTransform: "uppercase" }}>
            pay securely
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PaymentGateway cartData={cartData} />
        </AccordionDetails>
      </Accordion>
      {openAddressModal
        ? createPortal(
            <div className="add-new-address-modal">
              <div className="address-form-container">
                <div className="adress-form-head flex">
                  <div>Add a new Address</div>
                  <Close onClick={() => setOpenAddressModal(false)} />
                </div>
                <form className="checkout-page-form" onSubmit={addNewAddress}>
                  <div className="checkout-form-field">
                    {checkoutFormData.map((formElement) => {
                      return (
                        <TextField
                          key={formElement.id}
                          id={formElement.id}
                          name={formElement.name}
                          label={formElement.label}
                          type={formElement.type}
                          size={formElement.size}
                          fullWidth={formElement.fullWidth}
                          helperText={formElement.helperText}
                          required={formElement.required}
                        />
                      );
                    })}
                  </div>
                  <div className="add-new-address-btn-panel">
                    <button
                      className="address-cancel-btn"
                      onClick={handleCheckoutCancelBtn}
                    >
                      cancel
                    </button>
                    <button className="address-submit-btn" type="submit">
                      submit
                    </button>
                  </div>
                </form>
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}

export default IsAuth(Checkout);
