import "../styles/App.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Header from "./Header";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "../pages/Home";
import ProductContainer from "../pages/ProductContainer";

function App() {
  
  return <div className="App">
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/:productCategory" element={<ProductContainer />}/>
      </Routes>
    </Router>
  </div>;
}

export default App;
