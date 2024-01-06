import React, { useState } from "react";
import "./PaymentGateway.css";
import { paymentOptionsList } from "../../Resources/PaymentGateway";
import PaymentOptionDisplay from "../PaymentOptions/PaymentOption";

function PaymentGateway(props) {
    const {cartData} = props;
    const [paymentOption, setpaymentOption] = useState('creditcard');
    const [bankSelected, setBankSelected] = useState(false);
    
  function handleChange(e) {
    setpaymentOption(e.target.value);
    setBankSelected(false);
  }
  function handleBankSelection() {
    setBankSelected(true);
  }
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
        <PaymentOptionDisplay paymentOption={paymentOption} bankSelected={bankSelected} handleBankSelection={handleBankSelection} cartData={cartData}/>
      </div>
    </div>
  );
}

export default PaymentGateway;
