import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./containers/navbar/Navbar.jsx";
import ProductCard from "./components/product_card/ProductCard.jsx";
import Product from "./container/view_product/Product.jsx";
import { Route } from "react-router-dom";

function App() {
  const [products, setProduct] = useState([]);

  function OnFilter(productId) {
    let product = products.filter((p) => p.id == parseInt(productId));
    if (product > 0) {
      return product[0];
    } else {
      alert("No hay productos con ese nombre");
    }
  }

  return (
    <div className="App">
      <Navbar />
      <Route
        path="/product/:productId"
        render={({ match }) => (
          <Product product={OnFilter(match.params.productId)} />
        )}
      />
      <ProductCard />
      {/* un get a la ruta del backedn que edvuelva ese id o que devuelva el producto que quieras / hasta que no esten las rutas no se puede seguir. / */}
    </div>
  );
}

export default App;

// ProductCard ==> Product
//

