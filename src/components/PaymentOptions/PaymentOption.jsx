import React from "react";
import { YearList, bankList } from "../../Resources/PaymentGateway";
import "./PaymentOption.css";
import { Button, TextField } from "@mui/material";

function PaymentOptionDisplay(props) {
  const {
    paymentOption,
    bankSelected,
    handleBankSelection,
    handlePlaceOrderClick,
    placeOrderBtn,
    handleCardDetailsChange,
    tnc,
  } = props;
  switch (paymentOption) {
    case "creditcard":
      return (
        <div className="credit-card-tab">
          <div className="tab-head">
            <span>Payment Option</span>
            <img src="/creditcard.webp" alt="creditcardicon" />
          </div>
          <CardsForm
            bankSelected={bankSelected}
            handleBankSelection={handleBankSelection}
            placeOrderBtn={placeOrderBtn}
            handlePlaceOrderClick={handlePlaceOrderClick}
            handleCardDetailsChange={handleCardDetailsChange}
            tnc={tnc}
          />
        </div>
      );

    case "debitcard":
      return (
        <div className="debit-card-tab">
          <div className="tab-head">
            <span>Payment Option</span>
            <img src="/debit-card.webp" alt="debitcardicon" />
          </div>
          <CardsForm
            bankSelected={bankSelected}
            handleBankSelection={handleBankSelection}
            placeOrderBtn={placeOrderBtn}
            handlePlaceOrderClick={handlePlaceOrderClick}
            handleCardDetailsChange={handleCardDetailsChange}
            tnc={tnc}
          />
        </div>
      );

    case "creditcardemi":
      return (
        <div className="credit-card-emi-tab">
          <div className="tab-head">
            <span>Payment Option</span>
            <img src="/creditcard.webp" alt="creditcardicon" />
          </div>
          <CardsForm
            bankSelected={bankSelected}
            handleBankSelection={handleBankSelection}
            placeOrderBtn={placeOrderBtn}
            handlePlaceOrderClick={handlePlaceOrderClick}
            handleCardDetailsChange={handleCardDetailsChange}
            tnc={tnc}
          />
        </div>
      );

    case "debitcardemi":
      return (
        <div className="debit-card-emi-tab">
          <div className="tab-head">
            <span>Payment Option</span>
            <img src="/debit-card.webp" alt="debitcardicon" />
          </div>
          <CardsForm
            bankSelected={bankSelected}
            handleBankSelection={handleBankSelection}
            placeOrderBtn={placeOrderBtn}
            handlePlaceOrderClick={handlePlaceOrderClick}
            handleCardDetailsChange={handleCardDetailsChange}
            tnc={tnc}
          />
        </div>
      );

    case "netbanking":
      return (
        <div className="netbanking-tab">
          <div className="tab-head">
            <span>Select Payment Option</span>
          </div>
          <CardsForm
            bankSelected={bankSelected}
            handleBankSelection={handleBankSelection}
            placeOrderBtn={placeOrderBtn}
            handlePlaceOrderClick={handlePlaceOrderClick}
            handleCardDetailsChange={handleCardDetailsChange}
            tnc={tnc}
          />
        </div>
      );

    case "upi":
      return <div>UPI : Soon to be added</div>;

    case "wallet":
      return <div>Wallet : Soon to be added</div>;
  }
}

export default PaymentOptionDisplay;

const CardsForm = ({
  bankSelected,
  handleBankSelection,
  placeOrderBtn,
  handlePlaceOrderClick,
  handleCardDetailsChange,
  tnc,
}) => {
  return (
    <div className="paymentoption-form">
      <div className="paymentoption-form-heading">Select Bank</div>
      <select
        className="paymentoption-dropdown"
        onChange={handleBankSelection}
        name="bank"
        defaultValue={""}
      >
        <option disabled value="">
          Select a bank
        </option>
        {bankList.map((listItem, index) => {
          return (
            <option key={index} value={listItem}>
              {listItem}
            </option>
          );
        })}
      </select>
      {bankSelected ? (
        <div className="paymentoption-cardDetailsFrom-container">
          <CardDetailsForm handleCardDetailsChange={handleCardDetailsChange} />
        </div>
      ) : null}
      <div className="paymentoption-guidance">
        *Clicking on “Pay” will take you to a secure payment gateway where you
        can make your payment. Your order will not be completed without this
        action
      </div>
      <div className="paymentoption-tcn">
        <label>
          <input type="checkbox" onChange={tnc} />I agree to the{" "}
          <span>Terms & Conditions</span>
        </label>
      </div>
      <div className="paymentoption-payment-btn">
        <Button
          variant="contained"
          sx={{ fontSize: "0.8rem" }}
          onClick={handlePlaceOrderClick}
          disabled={placeOrderBtn}
        >
          place order
        </Button>
      </div>
    </div>
  );
};

const CardDetailsForm = ({ handleCardDetailsChange }) => {
  const yearList = YearList();
  return (
    <form className="paymentoption-cardDetails-from">
      <TextField
        label="Enter Card Number"
        type="number"
        size="small"
        id="cardno"
        name="cardno"
        inputProps={{ maxLength: "16" }}
        onChange={handleCardDetailsChange}
        fullWidth
        required
      />
      <TextField
        label="Enter Name on Card"
        type="text"
        size="small"
        id="cardholdername"
        name="cardholdername"
        onChange={handleCardDetailsChange}
        fullWidth
        required
      />
      <div>
        <div>Expiry Date</div>
        <div className="expirydate-cvv">
          <select
            name="expmonth"
            id="expmonth"
            defaultValue={""}
            onChange={handleCardDetailsChange}
            required
          >
            <option disabled value="">
              MM
            </option>
            <option value="january">Jan</option>
            <option value="february">Feb</option>
            <option value="march">Mar</option>
            <option value="april">Apr</option>
            <option value="march">May</option>
            <option value="june">Jun</option>
            <option value="july">Jul</option>
            <option value="august">Aug</option>
            <option value="september">Sep</option>
            <option value="october">Oct</option>
            <option value="november">Nov</option>
            <option value="december">Dec</option>
          </select>
          <select
            name="expyear"
            id="expyear"
            defaultValue={""}
            onChange={handleCardDetailsChange}
            required
          >
            <option value="" disabled>
              YYYY
            </option>
            {yearList.map((listItem, i) => {
              return (
                <option value={listItem} key={i}>
                  {listItem}
                </option>
              );
            })}
          </select>
          <TextField
            type="number"
            size="small"
            id="cvv"
            name="cvv"
            label="CVV"
            onChange={handleCardDetailsChange}
            required
          />
        </div>
      </div>
    </form>
  );
};
