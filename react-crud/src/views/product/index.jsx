// import useState dan useEffect
import { useState, useEffect } from 'react';

// import api
import api from '../../api';

// import Link
import { Link } from 'react-router-dom';

export default function ProductIndex() {

  // state
  const [products, setProducts] = useState([]);

  // define method
  const fetchDataProducts = async () => {
      try {
          const response = await api.get('/api/products');
          setProducts(response.data.data);
          // console.log(response.data.data);
      } catch (error) {
          console.error('Error fetching products:', error);
      }
  };
  // run hook useEffect
  useEffect(() => {
    
    // call method "fetchDataProducts"
    fetchDataProducts();

  }, []);

  // method deleteProduct
  const deleteProduct = async (id) => { 

    await api.delete(`/api/products/${id}`)
      .then(() => { 
        fetchDataProducts();
    })
  }
  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-12">
          <Link to="/products/create" className="btn btn-md btn-success rounded shadow border-0 mb-3">ADD NEW PRODUCT</Link>
          <div className="card border-0 rounded shadow">
            <div className="card-body">
              <table className="table table-bordered">
                <thead className="bg-dark text-white">
                  <tr>
                    <th scope='col'>Image</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Stock</th>
                    <th scope='col'>Price</th>
                    <th scope='col' style={{ 'width': '15%' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0
                    ? products.map((product, index) => (
                    <tr key={index}>
                      <td className='text-center'>
                        <img src={product.image} alt={product.name} width="200" className='rounded' />
                        </td>
                        <td>{ product.name }</td>
                        <td>{ product.stock }</td>
                        <td>{ product.price }</td>
                        <td className="text-center">
                            <Link to={`/products/edit/${product.id}`} className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</Link>
                            <button onClick={()=>deleteProduct(product.id)} className="btn btn-sm btn-danger rounded-sm shadow border-0">DELETE</button>
                        </td>
                    </tr>
                  ))
                    : <tr>
                        <td colSpan="5" className="text-center">
                            <div className="alert alert-danger mb-0">
                                Data Belum Tersedia!
                            </div>
                        </td>
                      </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}