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
  
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  }

  const validateForm = () => {
    const newErrors = {};
    if (!image) newErrors.image = "Image is required";
    if (!name) newErrors.name = "Name is required";
    if (!stock || stock <= 0) newErrors.stock = "Stock must be greater than 0";
    if (!price || price <= 0) newErrors.price = "Price must be greater than 0";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const storeProduct = async (e) => { 
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    formData.append('stock', stock);
    formData.append('price', price);

    try {
      await api.post('/api/products', formData);
      navigate('/products');
    } catch (error) {
      setErrors(error.response?.data || {});
    }
  };


  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card border-0 rounded shadow">
            <div className="card-body">
              <form onSubmit={storeProduct}>
                <div className="mb-3">
                    <label className="form-label fw-bold">Image</label>
                    <input type="file" onChange={handleFileChange} className="form-control"/>
                    {
                        errors.image && (
                            <div className="alert alert-danger mt-2">
                                {errors.image}
                            </div>
                        )
                    }
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Name</label>
                    <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} placeholder="Name Product"/>
                    {
                        errors.name && (
                            <div className="alert alert-danger mt-2">
                                {errors.name}
                            </div>
                        )
                    }
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Stock</label>
                    <input type="number" className="form-control" onChange={(e) => setStock(e.target.value)} placeholder="Stock Product"/>
                    {
                      errors.stock && (
                          <div className="alert alert-danger mt-2">
                              {errors.stock}
                          </div>
                      )
                    }
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Price</label>
                    <input type="number" className="form-control" onChange={(e) => setPrice(e.target.value)} placeholder="Price Product"/>
                    {
                      errors.price && (
                          <div className="alert alert-danger mt-2">
                              {errors.price}
                          </div>
                      )
                    }
                </div>

                <button type="submit" className="btn btn-md btn-primary rounded-sm shadow border-0">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}