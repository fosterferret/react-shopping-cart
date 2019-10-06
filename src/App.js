import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import data from "./data";
import { ProductContext } from "./Contexts/ProductContext";
import { CartContext } from "./Contexts/CartContext";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []);

  const addItem = item => {
    setCart([...cart, item]);
  };

  const removeItem = item => {
    setCart(cart.filter(product => product.id !== item.id));
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="App">
      <ProductContext.Provider value={{ products, addItem }}>
        <CartContext.Provider value={{ cart, removeItem }}>
          <Navigation cart={cart} />

          {/* Routes */}
          <Route exact path="/" component={Products} />

          <Route
            path="/cart"
            render={() => <ShoppingCart cart={cart} removeItem={removeItem} />}
          />
        </CartContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
