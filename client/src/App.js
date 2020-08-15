import React , { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./containers/navbar/Navbar.jsx";
import ProductCard from './components/product_card/ProductCard.jsx'
import Product from './components/view_product/Product.jsx'
import {Route} from 'react-router-dom';
import FormCategory from './components/crud/categoryform/CrudAddProduct.jsx'
import Crud from './containers/crud/Crud.jsx'
import Home from './components/crud/HomeCrudd/HomeCrud.jsx'
import Heading from './components/crud/Heading/crud_heading.jsx'
import Update from './components/crud/crud_update_product/CrudUpdateProduct.jsx'
import AddP from './components/crud/crud_add_product/CrudAddProduct.jsx'
import AddC from './components/crud/categoryform/CrudAddProduct.jsx'

function App() {
  const [products, setProduct] = useState([]);
  
  function OnFilter(productId){
    let product = products.filter(p => p.id == parseInt(productId))
    if(product > 0){
      return product[0] 
    }

    else{
     
    }
  }
  
  return (
    <div className="App">
      
      <Route path='/' component={Navbar} /> 
      <Route path='/product/:productId' render={({match}) => <Product product={OnFilter(match.params.productId)}/>} />
      {/*<Route exact path='/' component={Product} /> */}      
      <Route exact path='/' component={Home} />
      <Route exact path='/edit' component={Update} />
      <Route exact path='/agregarCategoria' component={AddC} /> 
      <Route exact path='/agregarProducto' component={AddP} />


      {/* un get a la ruta del backedn que edvuelva ese id o que devuelva el producto que quieras / hasta que no esten las rutas no se puede seguir. / */ } 
    </div>
  );
}

export default App;

// ProductCard ==> Product 
// 