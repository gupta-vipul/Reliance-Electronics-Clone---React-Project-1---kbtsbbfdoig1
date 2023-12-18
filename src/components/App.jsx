import "../styles/App.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./Header";
import Home from "../pages/Home";
import ProductContainer from "../pages/ProductContainer";
import Footer from "./Footer/Footer";
import { SearchProvider } from "../Context/SearchContext";
import ProductDetail from "../pages/ProductDetail";
import NotFoundPage from "../pages/NotFoundPage";

function App() {
  
  return <div className="App">
    <Router>
      <SearchProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/categories/:productCategory" element={<ProductContainer />}/>
          <Route path="/product/:product_id" element={<ProductDetail />} />
          <Route path="*" element={<NotFoundPage />}/>
        </Routes>
        <Footer />
      </SearchProvider>
    </Router>
  </div>;
}

export default App;
