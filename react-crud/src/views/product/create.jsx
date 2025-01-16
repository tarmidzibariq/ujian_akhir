// import useState dan useEffect
import { useState, useEffect } from 'react';

// import useNavigate
import { useNavigate } from 'react-router-dom';

// import api
import api from '../../api';


export default function ProductCreate() {

  // define state
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');

  // state validation
  const [errors, setErrors] = useState([]);
  
  // define navigate
  const navigate = useNavigate();

  // define method "handleFileChange"
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  }

  // validate form submission
  const validateForm = () => {
    const newErrors = {};
    if (!image) newErrors.image = "Image is required";
    if (!name) newErrors.name = "Name is required";
    if (!stock || stock <= 0) newErrors.stock = "Stock must be greater than 0";
    if (!price || price <= 0) newErrors.price = "Price must be greater than 0";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // define method "storeProduct"
  const storeProduct = async (e) => { 
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    formData.append('stock', stock);
    formData.append('price', price);

    // success callback
    try {
      await api.post('/api/products', formData);
      navigate('/products');
    } catch (error) {
      setErrors(error.response?.data || {});
    }
  };


  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
      <div className="max-w-full">
        <div className="w-full">
          <div className="bg-white border-0 rounded-lg shadow-md">
            <div className="p-6">
              <form onSubmit={storeProduct}>
                <div className="mb-4">
                    <label className="block font-bold mb-2">Image</label>
                    <input type="file" onChange={handleFileChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                    {
                        errors.image && (
                            <div className="bg-red-100 text-red-700 p-3 rounded-md mt-2">
                                {errors.image}
                            </div>
                        )
                    }
                </div>

                <div className="mb-4">
                    <label className="block font-bold mb-2">Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="Name Product"
                    />
                    {
                        errors.name && (
                            <div className="bg-red-100 text-red-700 p-3 rounded-md mt-2">
                                {errors.name}
                            </div>
                        )
                    }
                </div>

                <div className="mb-4">
                    <label className="block font-bold mb-2">Stock</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" 
                      onChange={(e) => setStock(e.target.value)} 
                      placeholder="Stock Product"
                    />
                    {
                      errors.stock && (
                          <div className="bg-red-100 text-red-700 p-3 rounded-md mt-2">
                              {errors.stock}
                          </div>
                      )
                    }
                </div>

                <div className="mb-4">
                    <label className="block font-bold mb-2">Price</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" 
                      onChange={(e) => setPrice(e.target.value)} 
                      placeholder="Price Product"
                    />
                    {
                      errors.price && (
                          <div className="bg-red-100 text-red-700 p-3 rounded-md mt-2">
                              {errors.price}
                          </div>
                      )
                    }
                </div>

                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition-colors duration-200 border-0"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}