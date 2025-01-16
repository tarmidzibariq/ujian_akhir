import { React, useState, useEffect } from 'react';

// import api
import api from '../api';

export default function Home() {

  const [products, setProducts] = useState([]);

  // define method
  const fetchDataProducts = async () => {
      try {
          const response = await api.get('/api/products');
          setProducts(response.data.data);
          console.log(response.data.data);
      } catch (error) {
          console.error('Error fetching products:', error);
      }
  };
  // run hook useEffect
  useEffect(() => {
    
    // call method "fetchDataProducts"
    fetchDataProducts();

  }, []);

  return (
    <div className="p-4 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
      <h1 className="text-2xl font-bold mb-4">Daftar Barang</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 object-cover mb-4"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">Rp {product.price.toLocaleString('id-ID')}</p>
          </div>
        ))}
      </div>
    </div>
    // <div className="p-5 mb-4 bg-light rounded-3">
    //   <div className="container-fluid py-5">
    //     <h1 className="display-5 fw-bold">Daftar Barang</h1>
    //     <p className="col-md-8 fs-4">Daftar Barang</p>
    //   </div>
    // </div>
  )
}