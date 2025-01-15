import { Routes, Route } from "react-router-dom";

// view homepage
import Home from "../views/home.jsx";

// views Product Index
import ProductIndex from "../views/product/index.jsx";

// views Product Create
import ProductCreate from "../views/product/create.jsx";

// view Products Edit
import ProductEdit from "../views/product/edit.jsx";

function RoutesIndex() {
  return (
    <Routes>

      {/* route "/" */}
      <Route path="/" element={<Home />} />
      
      {/* route "/products" */}
      <Route path="/products" element={<ProductIndex />} />
      
      {/* route "/products/create" */}
      <Route path="/products/create" element={<ProductCreate />} />
      
      {/* route "/products/edit/:id" */}
      <Route path="/products/edit/:id" element={<ProductEdit />} />
      
    </Routes>
  )
}
export default RoutesIndex