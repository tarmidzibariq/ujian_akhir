// import useState dan useEffect
import { React, useState, useEffect } from 'react';

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
    // <div className="container mt-5 mb-5">
    //   <div className="row">
    //     <div className="col-md-12">
    //       <Link to="/products/create" className="btn btn-md btn-success rounded shadow border-0 mb-3">ADD NEW PRODUCT</Link>
    //       <div className="card border-0 rounded shadow">
    //         <div className="card-body">
    //           <table className="table table-bordered">
    //             <thead className="bg-dark text-white">
    //               <tr>
    //                 <th scope='col'>Image</th>
    //                 <th scope='col'>Name</th>
    //                 <th scope='col'>Stock</th>
    //                 <th scope='col'>Price</th>
    //                 <th scope='col' style={{ 'width': '15%' }}>Actions</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {products.length > 0
    //                 ? products.map((product, index) => (
    //                 <tr key={index} className={`${
                      //   index % 2 === 0
                      //     ? 'bg-gray-50 dark:bg-gray-800'
                      //     : 'bg-white dark:bg-gray-900'
                      // } border-b dark:border-gray-700`}>
    //                   <td className='text-center'>
    //                     <img src={product.image} alt={product.name} width="200" className='rounded' />
    //                     </td>
    //                     <td className="px-6 py-4">{ product.name }</td>
    //                     <td className="px-6 py-4">{ product.stock }</td>
    //                     <td className="px-6 py-4">{ product.price }</td>
    //                     <td className="text-center">
    //                         <Link to={`/products/edit/${product.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">EDIT</Link>
    //                         <button onClick={()=>deleteProduct(product.id)} className="btn btn-sm btn-danger rounded-sm shadow border-0">DELETE</button>
    //                     </td>
    //                 </tr>
    //               ))
    //                 : <tr>
    //                     <td colSpan="5" className="text-center">
    //                         <div className="alert alert-danger mb-0">
    //                             Data Belum Tersedia!
    //                         </div>
    //                     </td>
    //                   </tr>
    //               }
    //             </tbody>
    //           </table>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
      {/* Add Product Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Product List</h1>
        <Link
          to="/products/create"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Product
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Image</th>
              <th className="px-6 py-3 text-left">Name Product</th>
              <th className="px-6 py-3 text-left">Stock</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } hover:bg-gray-100 border-b`}
                >
                  <td className="px-6 py-4">{product.id}</td>
                  <td className="px-6 py-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                  </td>
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4">Rp {product.price.toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/products/edit/${product.id}`}
                      className="text-blue-600 hover:underline font-medium mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="text-red-600 hover:underline font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-4 text-center text-gray-500 font-semibold"
                >
                  <div className="flex flex-col items-center">
                    <img
                      src="https://via.placeholder.com/150"
                      alt="No Data"
                      className="w-20 h-20 mb-4"
                    />
                    <p>No products available!</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}