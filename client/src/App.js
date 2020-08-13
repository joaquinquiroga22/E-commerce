import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProductCard from './components/product_card/ProductCard.jsx';
import Product from './container/view_product/Product.jsx';

function App() {
  return (
    <div className="App">
    	<ProductCard/>
    	<ProductCard/>
    	<ProductCard/>
    	<ProductCard/>
      <Product /> 
    </div>
  );
}

export default App;
