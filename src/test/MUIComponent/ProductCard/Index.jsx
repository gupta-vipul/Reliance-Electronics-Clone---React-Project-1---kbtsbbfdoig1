import { Card, CardMedia } from '@mui/material';
import React from 'react'

function MUICard() {
  return (
    <>
        <Card style={{padding: '20px', heigth: '300px', width: '200px', border: 'none'}}>
            <div style={{height: '50%', width: 'auto'}}>
            <CardMedia 
                component="img"
                image="https://i.dummyjson.com/data/products/1/1.jpg"
                
                />
            </div>
            <div>Some Product</div>
            <div>It's price</div>
            <div>It's Rating</div>
        </Card>
    </>
  )
}

export default MUICard;