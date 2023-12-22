import './Footer.css';
import React from 'react'
import { v4 as uuidv4 } from 'uuid';

function Footer(props) {
  const FooterData = [
    {
      _id : uuidv4(),
      footerListTitle : 'product categories',
      footerList : [
        {
          _id: uuidv4(),
          footerSubListItem: "smartphones",
          path: "/mobile"
        },
        {
          _id: uuidv4(),
          footerSubListItem: "laptop",
          path: "/laptop"
        },
        {
          _id: uuidv4(),
          footerSubListItem: "ac",
          path: "/ac"
        },
        {
          _id: uuidv4(),
          footerSubListItem: "tv",
          path: "/tv"
        },
        {
          _id: uuidv4(),
          footerSubListItem: "kitchenappliances",
          path: "/kitchenappliances"
        }
      ],
    },
    {
      _id: uuidv4(),
      footerListTitle : 'site info',
      footerList : [],
    },
    {
      _id: uuidv4(),
      footerListTitle : 'resource centre',
      footerList : [],
    },
    {
      _id: uuidv4(),
      footerListTitle : 'policies',
      footerList : [],
    }
  ]
  return (
    <div className='footer'>
      <div className='footer-lists'>
        {
          FooterData.map((item)=>{
            return (
              <div key={item._id}>
                <h3>{item.footerListTitle.toUpperCase()}</h3>
                <ul>
                  {
                    item.footerList.map((item)=>{
                      return <li key={item._id}>{item.footerSubListItem}</li>
                    })
                  }
                </ul>
              </div>
            )
          })
        }
      </div>
    <div>&copy; 2023 Reliance Digital. All Rights Reserved.</div>
    </div> 
  )
}

export default Footer;