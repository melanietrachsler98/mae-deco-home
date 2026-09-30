import { CartProvider } from "./context/CartProvider";
import { Routes, Route } from "react-router";

// PAGES
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import NotFound from "./pages/NotFound/NotFound";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
//COMPONENTS
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";

//<Route path="/category/:categoryId" element={<ItemListContainer />} />
const App = () => {
  return (
    <CartProvider>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<ItemListContainer />} />
          <Route
            path="/products/:productId"
            element={<ItemDetailContainer />}
          />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </CartProvider>
  );
};

export default App;
