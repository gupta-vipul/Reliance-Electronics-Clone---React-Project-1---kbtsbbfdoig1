import React, { useContext, useState } from 'react'
import IsAuth from '../components/IsAuth/IsAuth';
import { Accordion, AccordionDetails, AccordionSummary, Button, TextField, Typography } from '@mui/material';
import { Close, ExpandMore } from '@mui/icons-material';
import { createPortal } from 'react-dom';
import { checkoutFormData } from '../Constants/data';
// import { AuthContext } from '../Context/AuthContext';

function Checkout() {
  // const {userDetails} = useContext(AuthContext);
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [userAddress, setUserAddress] = useState(
    {
      pincode: "",
      firstname: "",
      lastname: "",
      flatno: "",
      street: "",
      landmark: "",
      city: "",
      state: "",
      mobileno: "",
      landlineno: "",
    }
  );

  function addNewAddress(e) {
    e.preventDefault();
    const addressInLS = JSON.parse(localStorage.getItem('addresses'));
    console.log(addressInLS);
    const newAddress = {...userAddress};
    const formData = new FormData(e.currentTarget);
    formData.forEach((value, key)=>{
      newAddress[key] = value;
    })

  }

  function handleCheckoutCancelBtn(e) {
    e.preventDefault();
    setOpenAddressModal(false);
  }
  return (
    <div className='checkout-page'>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
        >
          <Typography sx={{fontWeight:'650', textTransform:'uppercase'}}>Shipping Address</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button variant="outlined" sx={{fontSize: '0.8rem'}} onClick={()=>setOpenAddressModal(true)}>add new shipping address</Button>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMore />}
        >
          <Typography sx={{fontWeight:'650', textTransform:'uppercase'}}>order details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button variant="outlined" sx={{fontSize: '0.8rem'}} onClick={()=>setOpenAddressModal(true)}>add new shipping address</Button>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMore />}
        >
          <Typography sx={{fontWeight:'650', textTransform:'uppercase'}}>pay securely</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button variant="outlined" sx={{fontSize: '0.8rem'}} onClick={()=>setOpenAddressModal(true)}>add new shipping address</Button>
        </AccordionDetails>
      </Accordion>
      {
        openAddressModal ? (
          createPortal(<div className='add-new-address-modal'>
            <div className="address-form-container">
              <div className='adress-form-head flex'>
                <div>Add a new Address</div>
                <Close onClick={()=>setOpenAddressModal(false)}/>
              </div>
              <form className='checkout-page-form' onSubmit={addNewAddress}>
                <div className='checkout-form-field'>
                  {
                    checkoutFormData.map((formElement)=>{
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
                      )
                    })
                  }
                </div>
                <div className='add-new-address-btn-panel'>
                    <button className='address-cancel-btn' onClick={handleCheckoutCancelBtn}>cancel</button>
                    <button className='address-submit-btn' type='submit'>submit</button>
                </div>
              </form>
            </div>
          </div>, document.body)
        ) :
        (null)
      }
    </div>
  )
}

export default IsAuth(Checkout);