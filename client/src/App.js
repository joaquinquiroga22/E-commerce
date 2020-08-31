import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import { useSelector, useDispatch } from "react-redux";

//Componentes
import Navbar from "./containers/navbar/Navbar.jsx";
import Product from "./components/view_product/Product.jsx";
import Catalogue from "./containers/catalogue/Catalogue.jsx";
import AdminPage from "./containers/admin_page/AdminPage.jsx";
import AddUser from "./components/add_user/AddUser.jsx";
import Footer from "./components/footer/Footer.jsx";
import TrolleyTable from "./components/trolley_table/TrolleyTable";
import Review from "./components/view_review/Review.jsx";
import ProductCard from "./components/product_card/ProductCard";
import { getCategories } from "./actions/categories";

import { alertActions } from "./actions/alert";
import { PrivateRoute } from "./components/privateRouter/PrivateRoute";
// import { HomePage } from "./components/login/HomePage";
import Profile from "./components/Profile/ProfileCard";
import { LoginPage } from "./components/login/LoginPage";
import { RegisterPage } from "./components/login/RegisterPage";
import { HomePage } from "./containers/home/HomePage.jsx";
import { useHistory } from "react-router-dom";
// export const history = createBrowserHistory();

function App() {
  let history = useHistory();
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories);
  const [renderAddUser, setRenderAddUser] = useState(false);

  useEffect(() => {
    createBrowserHistory().listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }, []);

  // useEffect(() => {
  //   dispatch(getProducts());
  //   dispatch(getCategories());
  // }, [getCategories, getProducts]);

  return (
    <Router history={history}>
      <Switch>
        <div className="App">
          <Route
            path="/"
            render={() => <Navbar botonNav={setRenderAddUser} />}
          />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/catalogo" component={Catalogue} />
          <PrivateRoute exact path="/admin" component={AdminPage} />

          {/* <Route exact path="/admin" component={AdminPage} /> */}
          <Route exact path="/carrito" component={TrolleyTable} />
          <Route
            exact
            path="/product/:id"
            render={({ match }) => <Product id={match.params.id} />}
          />
          {renderAddUser && <AddUser onClose={setRenderAddUser} />}
          <Route exact path="/me" component={Profile} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/loginpage" component={LoginPage} />
          {/* <Redirect from="*" to="/" /> */}
          {/* <Route exact path="/">
            {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
          </Route> */}
          <Route path="/" component={Footer} />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
