import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddProduct from './pages/AddProduct';
import Checkout from './pages/Checkout';
import './App.css';

function App() {
  // ✅ Move cart and total to top-level App component
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // ✅ Home component inside App to access state
  const Home = () => (
    <div>
      <h1>🛒 Local Store</h1>
      <Link to="/add-product" className="admin-link">➕ Add Product</Link>
      <div className="products">
        {products.map((p) => (
          <div key={p._id} className="card">
            <img src={p.image} alt={p.title} />
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <h4>₹{p.price}</h4>
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="cart">
        <h2>🧺 Cart</h2>
        {cart.map((c, i) => (
          <div key={i}>{c.title} - ₹{c.price}</div>
        ))}
        <h3>Total: ₹{total}</h3>
        <Link to="/checkout" className="admin-link">🧾 Checkout</Link>
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/checkout" element={<Checkout cart={cart} total={total} />} />
      </Routes>
    </Router>
  );
}

export default App;