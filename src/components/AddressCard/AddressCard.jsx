import React from "react";
import "./AddressCard.css";

function AddressCard(props) {
    const {cardDetails} = props;
  return (
    <div className="address-card-checkout">
      <div className="user-name-address-card">{`${cardDetails?.firstname} ${cardDetails?.lastname}`}</div>
      <div className="address-card-flatno">{`${cardDetails?.flatno}, ${cardDetails?.street}, ${cardDetails?.landmark}`}</div>
      <div className="address-card-city">{`${cardDetails?.city}-${cardDetails?.pincode}, ${cardDetails?.state}`}</div>
      <div className="address-card-mobile"><span>Mobile:</span> {`${cardDetails?.mobileno}`}</div>
    </div>
  );
}

export default AddressCard;
