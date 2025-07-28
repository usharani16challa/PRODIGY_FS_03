import React, { useState } from 'react';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      alert(data.message || 'Product added successfully!');
      setFormData({ title: '', description: '', price: '', image: '' });
    } catch (error) {
      alert('Error adding product');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
        <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" required />
        <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" required />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddProduct;