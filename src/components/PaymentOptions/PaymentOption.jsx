import React, { useState } from "react";
import { YearList, bankList } from "../../Resources/PaymentGateway";
import './PaymentOption.css';
import { Button, TextField } from "@mui/material";

function PaymentOptionDisplay(props) {
  const { paymentOption, bankSelected, handleBankSelection, cartData } = props;
  switch (paymentOption) {
    case "creditcard":
      return (
        <div className="credit-card-tab">
          <div className="tab-head">
            <span>Payment Option</span>
            <img src="/creditcard.webp" alt="creditcardicon" />
          </div>
          <CardsForm bankSelected={bankSelected} handleBankSelection={handleBankSelection} cartData={cartData}/>
        </div>
      );

    case "debitcard":
      return (
        <div className="debit-card-tab">
          <div className="tab-head">
            <span>Payment Option</span>
            <img src="/debit-card.webp" alt="debitcardicon" />
          </div>
          <CardsForm bankSelected={bankSelected} handleBankSelection={handleBankSelection} cartData={cartData}/>
        </div>
      );

    case "creditcardemi":
      return (
        <div className="credit-card-emi-tab">
          <div className="tab-head">
            <span>Payment Option</span>
            <img src="/creditcard.webp" alt="creditcardicon" />
          </div>
          <CardsForm bankSelected={bankSelected} handleBankSelection={handleBankSelection} cartData={cartData}/>
        </div>
      );

    case "debitcardemi":
      return (
        <div className="debit-card-emi-tab">
          <div className="tab-head">
            <span>Payment Option</span>
            <img src="/debit-card.webp" alt="debitcardicon" />
          </div>
          <CardsForm bankSelected={bankSelected} handleBankSelection={handleBankSelection} cartData={cartData}/>
        </div>
      );

    case "netbanking":
      return <div className="netbanking-tab">
      <div className="tab-head"><span>Select Payment Option</span></div>
      <CardsForm bankSelected={bankSelected} handleBankSelection={handleBankSelection} cartData={cartData}/>
    </div>

    case "upi":
      return <div>UPI</div>;

    case "wallet":
      return <div>Wallet</div>;
  }
}

export default PaymentOptionDisplay;

const CardsForm = ({bankSelected, handleBankSelection, cartData}) => {
  return (
    <div className="paymentoption-form">
      <div className="paymentoption-form-heading">Select Bank</div>
      <select className="paymentoption-dropdown" onChange={handleBankSelection} name='bank' defaultValue={''}>
        <option disabled value="">
          Select a back
        </option>
        {
            bankList.map((listItem, index)=>{
                return <option key={index} value={listItem} >{listItem}</option>
            })
        }
      </select>
      {
        bankSelected ? 
        (<div className="paymentoption-cardDetailsFrom-container">
            <CardDetailsForm />
        </div>) : 
        (null)
      }
      <div className="paymentoption-guidance">
        *Clicking on “Pay” will take you to a secure payment gateway where you
        can make your payment. Your order will not be completed without this
        action
      </div>
      <div className="paymentoption-tcn">
        <label>
          <input type="checkbox" />I agree to the{" "}
          <span>Terms & Conditions</span>
        </label>
      </div>
      <div className="paymentoption-payment-btn"><Button variant='contained' sx={{fontSize: '0.8rem'}}>pay rs. {cartData?.data?.totalPrice}</Button></div>
    </div>
  );
};


const CardDetailsForm = ()=>{
    const yearList = YearList();
    return (
        <form className="paymentoption-cardDetails-from">
            <TextField 
                label = 'Enter Card Number'
                type="number"
                size="small"
                inputProps={{ maxLength: '16' }}
                fullWidth
            />
            <TextField 
                label = 'Enter Name on Card'
                type="text"
                size="small"
                fullWidth
            />
            <div>
            <div>Expiry Date</div>
                <div className="expirydate-cvv">
                    <select name="month" id="month" defaultValue={""}>
                        <option disabled value="">MM</option>
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
                    <select name="year" id="year" defaultValue={""}>
                        <option value="" disabled>YYYY</option>
                        {
                            yearList.map((listItem, i)=>{
                                return (
                                    <option value="listItem" key={i}>{listItem}</option>
                                )
                            })
                        }
                    </select>
                    <TextField 
                        type="number"
                        size="small"
                        label="CVV"
                        />
                </div>
            </div>
        </form>
    )
};