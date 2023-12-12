export const GET_CATEGORIES = "https://academics.newtonschool.co/api/v1/ecommerce/electronics/categories";


export const GET_PRODUCTS_CATEGORYWISE = (category) => {
    return `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?filter={"subCategory": "${category}"}`;
}

export const GET_PRODUCTS_FOR_HOMEPAGE = `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?filter={"sellerTag":"trending"}`;