import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import About from "./pages/About";
import Header from "./components/Header";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Confirmed from "./pages/Confirmed";
import Footer from "./components/Footer";



export default function App() {
  return (
     <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmed" element={<Confirmed />} />
        <Route path="/about" element={<About />} />


      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
