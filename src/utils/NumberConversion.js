export const INRConversion = (price)=>{
    let rupee = new Intl.NumberFormat("en-IN", {
        style: 'currency',
        currency: 'INR',        
    })
    let formattedResult = rupee.format(price);
    return formattedResult;
};


