import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
//Componentes
import Navbar from "./containers/navbar/Navbar.jsx";
import Product from "./components/view_product/Product.jsx";
import Catalogue from "./containers/catalogue/Catalogue.jsx";
import Crud from "./containers/crud/Crud.jsx";



import { useSelector, useDispatch } from "react-redux";
//importamos la accion a dispatchear
import { getProducts } from "./actions/products.js";

function App() {
  const [search, setSearch] = useState([]);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [getProducts]);

  const searchQuery = function (valor) {
    setSearch(valor);
  };
  return (

    <Router>
      <div className="App">
        <Route path="/" render={() => <Navbar onSearch={searchQuery} />} />
        <Route exact path="/admin" component={Crud} />
        <Route exact path="/catalogo" component={Catalogue} />
        <Route
          exact
          path="/product/:id"
          render={({ match }) => <Product id={match.params.id} />}
        />
      </div>
    </Router>

  );
}

export default App;
