import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api';
import { Link } from 'react-router-dom';

export default function ProductEdit() {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams();
  
  const fetchDetailProduct = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/products/${id}`);
      const data = response.data.data;
      
      setImage(data.image);
      setName(data.name);
      setStock(data.stock);
      setPrice(data.price);
    } catch (error) {
      console.error('Error fetching product:', error);
      setErrors(error.response?.data || {});
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDetailProduct();
  }, [id]); // Tambahkan id sebagai dependency
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        // Membuat URL untuk preview gambar
        const imageUrl = URL.createObjectURL(file);
        setImage(file);
        
        // Preview gambar
        const previewImg = document.getElementById('preview');
        if (previewImg) {
            previewImg.src = imageUrl;
        }
    }
  }

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!stock || stock <= 0) newErrors.stock = "Stock must be greater than 0";
    if (!price || price <= 0) newErrors.price = "Price must be greater than 0";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateProduct = async (e) => { 
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    if (image instanceof File) {
      formData.append('image', image);
    }
    formData.append('name', name);
    formData.append('stock', stock);
    formData.append('price', price);
    formData.append('_method', 'PUT');

    try {
      await api.post(`/api/products/${id}`, formData);
      navigate('/products');
    } catch (error) {
      setErrors(error.response?.data || {});
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
      <div className="max-w-full">
        <div className="w-full">
          <div className="bg-white border-0 rounded-lg shadow-md">
            <div className="p-6">
              <form onSubmit={updateProduct}>
                <div className="mb-4">
                  {image && (
                    <div className="mb-3">
                      <img 
                        src={image instanceof File ? URL.createObjectURL(image) : image} 
                        alt="Preview" 
                        className="w-32 h-32 object-cover rounded-lg mx-auto"
                      />
                    </div>
                  )}
                  <h5 className='block font-bold text-center'>#{id}</h5>
                  <label className="block font-bold mb-2">Image</label>
                  <input 
                    type="file" 
                    onChange={handleFileChange} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    accept="image/*"
                  />
                  {errors.image && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-md mt-2">
                      {errors.image}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block font-bold mb-2">Name</label>
                  <input 
                    type="text" 
                    value={name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Name Product"
                  />
                  {errors.name && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-md mt-2">
                      {errors.name}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block font-bold mb-2">Stock</label>
                  <input 
                    type="number" 
                    value={stock}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" 
                    onChange={(e) => setStock(e.target.value)} 
                    placeholder="Stock Product"
                  />
                  {errors.stock && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-md mt-2">
                      {errors.stock}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block font-bold mb-2">Price</label>
                  <input 
                    type="number" 
                    value={price}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" 
                    onChange={(e) => setPrice(e.target.value)} 
                    placeholder="Price Product"
                  />
                  {errors.price && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-md mt-2">
                      {errors.price}
                    </div>
                  )}
                </div>

                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition-colors duration-200 border-0"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}