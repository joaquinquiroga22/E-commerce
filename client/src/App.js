import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
//Componentes
import Navbar from "./containers/navbar/Navbar.jsx";
import Product from "./components/view_product/Product.jsx";
import Catalogue from "./containers/catalogue/Catalogue.jsx";
import AdminPage from "./containers/admin_page/AdminPage.jsx";
import AddUser from "./components/add_user/AddUser.jsx";
import Footer from "./components/footer/Footer.jsx";

import { useSelector, useDispatch } from "react-redux";
//importamos la accion a dispatchear
import { getProducts } from "./actions/products.js";
import TrolleyTable from "./components/trolley_table/TrolleyTable";
import ProductCard from "./components/product_card/ProductCard";
import { getCategories } from "./actions/categories";
import axios from 'axios';
function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories);
  const [renderAddUser, setRenderAddUser] = useState(false);

  useEffect(() => {
    // dispatch(getProducts());
    // dispatch(getCategories());
    axios.get("http://localhost:3000/profile", {withCredentials: true}).then((res) => console.log(res))
  }, [
    //getCategories, getProducts
  ]);

  const logout = function(){
    //axios.get("http://localhost:3000/profile", {withCredentials: true}).then((res) => console.log(res))

    axios.get("http://localhost:3000/logout", {withCredentials: true}).then((res) => console.log(res))
  }

  const login = function(e){
    e.preventDefault();
    const data = {
      email: "usuario1@user.com",
      password: "user"
    }
    axios.post("http://localhost:3000/login",data, {withCredentials: true}).then((res) => console.log(res) )
  }
  const Login = function(){
    return (<form onSubmit={login}>
              <input type="email" name="email" />
              <input type="password" name="password" />
              <input type="submit" value="nico gay"/>
              <button type="button" onClick={logout}>Logout</button>
            </form>);
  }

  return (
    <Router>
      <div className="App">
        <Route path="/" component={Login} />

      </div>
    </Router>
  );
}

export default App;
