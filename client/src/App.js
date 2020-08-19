import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
//Componentes
import Navbar from "./containers/navbar/Navbar.jsx";
import Product from "./components/view_product/Product.jsx";
import Catalogue from "./containers/catalogue/Catalogue.jsx";
import Crud from "./containers/crud/Crud.jsx";

//React-Redux
import { Provider } from "react-redux";
import store from "./store/main";

function App() {
  const [search, setSearch] = useState([]);

  const searchQuery = function (valor) {
    setSearch(valor);
  };
  return (
 reduxIntento
    <Provider store={store}>
      <Router>
        <div className="App">
          <Route path="/" render={() => <Navbar onSearch={searchQuery} />} />
          <Route exact path="/admin" component={Crud} />
          <Route exact path="/" component={Catalogue} />
          <Route
            exact
            path="/product/:id"
            render={({ match }) => <Product id={match.params.id} />}
          />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
