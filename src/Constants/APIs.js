export const GET_CATEGORIES =
  "https://academics.newtonschool.co/api/v1/ecommerce/electronics/categories";

export const GET_PRODUCTS_CATEGORYWISE = (category, limit) => {
  return `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?${
    limit ? "limit=10&" : ""
  }filter={"subCategory": "${category}"}`;
};

export const GET_PRODUCTS_FOR_HOMEPAGE = `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?limit=10&filter={"sellerTag":"trending"}`;

export const GET_BESTSELLER_LIST = `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?limit=10&filter={"sellerTag":"best seller"}`;

export const GET_NEW_ARRIVAL = `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?limit=10&filter={"sellerTag":"new arrival"}`;

export const GET_SEARCH_DATA = (searchTerm) =>
  `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?search={"name":"${searchTerm}"}`;

export const GET_SELLERTAG_PRODUCT = (category) =>
  `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?filter={"sellerTag":"${category}"}`;

// User API

export const USER_LOGIN_API =
  "https://academics.newtonschool.co/api/v1/user/login";

export const USER_SIGNUP_API =
  "https://academics.newtonschool.co/api/v1/user/signup";

// Product Detail page API
export const GET_PRODUCT_DETAILS = (id) =>
  `https://academics.newtonschool.co/api/v1/ecommerce/product/${id}`;

export const PRODUCT_REVIEW = (productid) =>
  `https://academics.newtonschool.co/api/v1/ecommerce/review/${productid}`;

// Cart API
export const GET_CART_ITEMS =
  "https://academics.newtonschool.co/api/v1/ecommerce/cart";

export const PATCH_ITEM_TO_CART = (id) =>
  `https://academics.newtonschool.co/api/v1/ecommerce/cart/${id}`;

export const REMOVE_ITEM_FROM_CART = (id) =>
  `https://academics.newtonschool.co/api/v1/ecommerce/cart/${id}`;

export const CLEAR_CART = `https://academics.newtonschool.co/api/v1/ecommerce/cart`;
// Wishllist

export const GET_WISHLIST_DATA = `https://academics.newtonschool.co/api/v1/ecommerce/wishlist`;

export const REMOVE_PRODUCT_FROM_WISHLIST = (productId) =>
  `https://academics.newtonschool.co/api/v1/ecommerce/wishlist/${productId}`;

// Pincode get api

export const GET_PINCODE_DETAILS = (pincode) =>
  `https://api.postalpincode.in/pincode/${pincode}`;
