import './Footer.css';
import React from 'react'
import { v4 as uuidv4 } from 'uuid';

function Footer(props) {
  const FooterData = [
    {
      _id : uuidv4(),
      footerListTitle : 'product categories',
      footerList : [
        "air conditioner",
        "audio",
        "health care",
        "kitchen appliances",
        "laptop",
        "smartphones",
        "refrigerator",
        "tablet",
        "travel",
        "television",
        "washing machine"
      ],
    },
    {
      _id: uuidv4(),
      footerListTitle : 'site info',
      footerList : [
        "about reliance digital", 
        'ResQ services',
        'site map',
        'gift cards',
        'corporate enquires',
        'contact us',
      ],
    },
    {
      _id: uuidv4(),
      footerListTitle : 'resource centre',
      footerList : [
        "Product Reviews",
        "Buying Guides",
        "How Tos",
        "Featured Stories",
        "Events & Happenings", 
        "Nearest Store",
      ],
    },
    {
      _id: uuidv4(),
      footerListTitle : 'policies',
      footerList : [
        'Terms of Use',
        'FAQs',
        'Cancellation and Return Policy',
        'Pricing and Payments Policy',
        'Shipping and Delivery Policy',
        'Privacy Policy',
        'E-waste Recycling Policy',
        'EMI and Additional Cashback T&C',
        'RelianceOne Loyalty Program T&C',
        'Caution Notice',
      ],
    }
  ]
  return (
    <div className='footer'>
      <div className='footer-lists'>
        {
          FooterData.map((item)=>{
            return (
              <div key={item._id} className='flist'>
                <h3 className='footer-list-title'>{item.footerListTitle.toUpperCase()}</h3>
                <ul className='footer-list'>
                  {
                    item.footerList.map((item, index)=>{
                      return <li className='footer-list-items' key={index}>{item}</li>
                    })
                  }
                </ul>
              </div>
            )
          })
        }
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
      <div className='footer-dis-copy-section'>
        <div className='disclaimer-tag text-capitalise'>disclaimer</div>
        <p className='disclaimer-para'>Product prices, offers and availability are subject to change from time to time. All prices are inclusive of taxes. Product colours & images are only for illustration and they may not exactly match with the actual product. Product specs are subject to change & may vary from actual product. While every care is taken to avoid inaccuracies in content, these are provided as is, without warranty of any kind.</p>
        <div className='footer-copyright'>&copy; 2023 Reliance Digital. All Rights Reserved.</div>
      </div>
    </div> 
  )
}

export default Footer;