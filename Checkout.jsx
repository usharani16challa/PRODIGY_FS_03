import React, { useState } from 'react';

const Checkout = ({ cart, total }) => {
  const [form, setForm] = useState({ name: '', address: '' });

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleOrder = async (e) => {
    e.preventDefault();

    const items = cart.map(item => ({
      productId: item._id,
      title: item.title,
      price: item.price,
      quantity: 1
    }));

    const res = await fetch('http://localhost:5000/orders', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ ...form, items, total }),
    });

    const data = await res.json();
    alert(data.message);
    setForm({ name: '', address: '' });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🧾 Checkout</h2>
      <form onSubmit={handleOrder} style={{ maxWidth: '400px' }}>
        <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
        <textarea name="address" placeholder="Your Address" value={form.address} onChange={handleChange} required />
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;