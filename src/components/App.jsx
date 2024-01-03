import "../styles/App.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { SearchProvider } from "../Context/SearchContext";
import { AuthProvider } from "../Context/AuthContext";
import { CartProvider } from "../Context/CartContext";
import Home from "../pages/Home";
import Header from "./Header";
import ProductContainer from "../pages/ProductContainer";
import ProductDetail from "../pages/ProductDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Cart from "../pages/Cart";
import Footer from "./Footer/Footer";
import NotFoundPage from "../pages/NotFoundPage";
import Checkout from "../pages/Checkout";
import MyWishlist from "../pages/MyWishlist";
import MyOrders from "../pages/MyOrders";
import MyAccount from "../pages/MyAccount";
import Profile from "../pages/Profile";

function App() {
  
  return <div className="App">
    <Router>
      <SearchProvider>
        <AuthProvider>
          <CartProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/categories/:productCategory" element={<ProductContainer />}/>
              <Route path="/page/:itemsCategories" element={<ProductContainer />}/>
              <Route path="/search/:userInput" element={<ProductContainer />} />
              <Route path="/product/:product_id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />}/>
              <Route path="/register" element={<Register />}/>
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profile" element={<Profile />}>
                <Route path="myaccount" element={<MyAccount />}/>
                <Route path="mywishlist" element={<MyWishlist />}/>
                <Route path="myorders" element={<MyOrders/>}/>
              </Route>
              <Route path="*" element={<NotFoundPage />}/>
            </Routes>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </SearchProvider>
    </Router>
  </div>;
}

export default App;
