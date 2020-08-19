import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
//Componentes
import Navbar from "./containers/navbar/Navbar.jsx";
import Product from "./components/view_product/Product.jsx";
import Catalogue from "./containers/catalogue/Catalogue.jsx";
import Crud from "./containers/crud/Crud.jsx";
import OrderUsers from "./components/trolley/OrderUser.jsx";
//React-Redux
import { Provider } from "react-redux";
import store from "./store/main.js";

function App() {
  const [search, setSearch] = useState([]);

  const searchQuery = function (valor) {
    setSearch(valor);
  };
  return (
<<<<<<< HEAD
    <Provider store={store}>
=======
    < Provider store={store} >
>>>>>>> master
      <Router>
        <div className="App">
          <Route path="/" render={() => <Navbar onSearch={searchQuery} />} />
          <Route exact path="/admin" component={Crud} />
<<<<<<< HEAD
          <Route exact path="/u" component={OrderUsers} />
          <Route exact path="/" component={Catalogue} />
=======
          <Route exact path="/catalogo" component={Catalogue} />
>>>>>>> master
          <Route
            exact
            path="/product/:id"
            render={({ match }) => <Product id={match.params.id} />}
          />
        </div>
      </Router>
    </Provider >
  );
}

export default App;
