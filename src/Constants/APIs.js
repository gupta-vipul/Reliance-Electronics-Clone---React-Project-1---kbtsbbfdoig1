export const GET_CATEGORIES = "https://academics.newtonschool.co/api/v1/ecommerce/electronics/categories";


export const GET_PRODUCTS_CATEGORYWISE = (category,limit) => {
    return `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?${limit ? "limit=10&" : ""}filter={"subCategory": "${category}"}`;
}

export const GET_PRODUCTS_FOR_HOMEPAGE = `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?limit=10&filter={"sellerTag":"trending"}`;

export const GET_BESTSELLER_LIST = `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?limit=10&filter={"sellerTag":"best seller"}`;

export const GET_NEW_ARRIVAL = `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?limit=10&filter={"sellerTag":"new arrival"}`;

export const GET_SEARCH_DATA = (searchTerm) => `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?search={"name":"${searchTerm}", "description":"${searchTerm}"}`;

export const GET_PRODUCT_DETAILS = (id) => `https://academics.newtonschool.co/api/v1/ecommerce/product/${id}`;

export const USER_LOGIN_API = 'https://academics.newtonschool.co/api/v1/user/login';

export const USER_SIGNUP_API = 'https://academics.newtonschool.co/api/v1/user/signup';