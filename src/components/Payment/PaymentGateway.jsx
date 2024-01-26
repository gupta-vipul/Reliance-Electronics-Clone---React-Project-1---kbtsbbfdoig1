import React, { useEffect, useState } from "react";
import "./PaymentGateway.css";
import { paymentOptionsList } from "../../Resources/PaymentGateway";
import PaymentOptionDisplay from "../PaymentOptions/PaymentOption";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { CLEAR_CART } from "../../Constants/APIs";

function PaymentGateway(props) {
  const { cartData } = props;
  const navigate = useNavigate();
  const [paymentOption, setpaymentOption] = useState("creditcard");
  const [bankSelected, setBankSelected] = useState(false);
  // need to enable place order button once we get all info.
  const [placeOrderBtn, setPlaceOrderBtn] = useState(true);
  const [bankName, setBankName] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardno: "",
    cardholdername: "",
    expmonth: "",
    expyear: "",
    cvv: "",
  });
  const [terms, setTerms] = useState("");
  const [openOrderPlacedModal, setOpenOrderPlacedModal] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");
  async function orderProduct(data) {
    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/ecommerce/order",
        {
          method: "POST",
          headers: {
            projectID: "kbtsbbfdoig1",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const jsonData = await response.json();
      // console.log(jsonData);
      setOrderStatus(jsonData.message);
      setOpenOrderPlacedModal(true);
      clearCart();
    } catch (error) {
      console.log(error);
    }
  }
  async function clearCart() {
    try {
      const response = await fetch(CLEAR_CART, {
        method: "DELETE",
        headers: {
          projectID: "kbtsbbfdoig1",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const jsonData = await response.json();
      console.log(jsonData);
    } catch (error) {
      console.log(error);
    }
  }
  function handlePlaceOrderClick() {
    const address = JSON.parse(localStorage.getItem("addresses"));
    delete address[0].firstname;
    delete address[0].lastname;
    delete address[0].flatno;
    delete address[0].mobileno;
    delete address[0].landmark;
    delete address[0].landlineno;
    const orderData = {
      productId: cartData.data.items[0].product._id,
      quantity: cartData.data.items[0].quantity,
      addressType: "HOME",
      address: address[0],
    };
    orderProduct(orderData);
  }
  function handleChange(e) {
    setpaymentOption(e.target.value);
    setBankSelected(false);
  }
  function handleBankSelection(e) {
    setBankSelected(true);
    setBankName(e.target.value);
  }
  function handleCardDetailsChange(e) {
    const updatedCardDetails = { ...cardDetails };
    updatedCardDetails[e.target.name] = e.target.value;
    setCardDetails(updatedCardDetails);
  }
  function tnc(e) {
    setTerms(e.target.value);
    if (
      bankName &&
      cardDetails.cardno &&
      cardDetails.cardholdername &&
      cardDetails.expmonth &&
      cardDetails.expyear &&
      cardDetails.cvv
    ) {
      setPlaceOrderBtn(false);
    }
  }
  function backtoHomepage() {
    navigate("/");
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [openOrderPlacedModal]);
  return (
    <div className="payment-gateway-section">
      <div className="payment-option-list">
        {paymentOptionsList.map((list, index) => {
          return (
            <div key={index} className="payment-option-list-item">
              <label htmlFor={list.id}>
                <input
                  type="radio"
                  id={list.id}
                  name="paymentoption"
                  value={list.value}
                  onChange={handleChange}
                />
                {list.label}
              </label>
            </div>
          );
        })}
      </div>
      <div className="payment-options">
        <PaymentOptionDisplay
          paymentOption={paymentOption}
          bankSelected={bankSelected}
          handleBankSelection={handleBankSelection}
          placeOrderBtn={placeOrderBtn}
          handlePlaceOrderClick={handlePlaceOrderClick}
          handleCardDetailsChange={handleCardDetailsChange}
          tnc={tnc}
        />
      </div>
      {openOrderPlacedModal
        ? createPortal(
            <div className="order-placed-modal-overlay">
              <div className="order-placed-modal">
                <img src="/placed.gif" alt="Order-Placed" />
                {orderStatus}
                <button
                  className="order-placed-home-btn"
                  onClick={backtoHomepage}
                >
                  continue shopping
                </button>
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}

export default PaymentGateway;
