
import './App.css'
import Home from './home/Home'
import Nav from './common/Nav'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  
import ProtectedRoute from './common/ProtectedRoute';
import Login from './common/Login';
import AddProduct from './product/AddProduct';
import Register from './common/Register';
import ProductList from './product/ProductList';
import ViewProduct from './product/ViewProduct';

function App() { 

  return (
    <>
    <div style={{backgroundColor: 'black',color: '#fff'}}>
  <Router>
      <Nav />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />

        <Route path="/addProduct" element={<AddProduct />} />
 

        {/* Protected for all logged-in users */}
        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        /> */}

        {/* Only Admins */}
        <Route
          path="/home"
          element={ 
              <Home />
          }
        />
        <Route
          path="/addProduct"
          element={
            // <ProtectedRoute >
              <AddProduct />
            // </ProtectedRoute>
          }
        />
        <Route path="/listProduct"
          element={
            // <ProtectedRoute >
              <ProductList />
            // </ProtectedRoute>
          }
        /> 

        <Route path="/viewProduct/:id" element={<ViewProduct />} />

        <Route path="/not-authorized" element={<h1>🚫 Not Authorized</h1>} />
      </Routes>
    </Router>
    </div>
    
    </>
  )
}

export default App
