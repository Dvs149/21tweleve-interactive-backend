import './App.css';
import Login from './pages/admin/Login';
import Register from './pages/admin/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import axios from 'axios'
import { Navbar } from './components/Navbar';
import { Navigate } from 'react-router-dom';
// import Home from './pages/user/Home';
import Layout from './pages/user/List';
// import ProductList from './pages/user/ProductList';
import AddProduct from './pages/user/AddProduct';
import EditProduct from './pages/user/EditProduct';
import ShowProduct from './pages/user/ShowProduct';
axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.headers.post['Content-Type'] = "multipart/form-data";
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {
  console.log(process.env.REACT_APP_SERVER_URL);
  // const isAuthenticated = localStorage.getItem("auth_token");
  // console.log(isAuthenticated);
  // const isAuthenticated = !!localStorage.getItem("auth_token");
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path='/' element={<Navigate to="/login" />} />

            {/* <Route path='/home' element={<Home />} /> */}
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/show-product/:id" element={<ShowProduct />} />
            <Route path="/list" element={<Layout />} />
            <Route path="/login" element={ <Login />}/>



            <Route path="/register" element={<Register />} />



        </Routes>
      </BrowserRouter>
      {/* <BrowserRouter> */}
      {/* <Routes>
            <Route path="/" element={<Home />} />
            <Route path="groups" element={<Home />} />
        </Routes> */}
      {/* </BrowserRouter> */}

      {/* <Register /> */}

    </div>
  );
}

export default App;
