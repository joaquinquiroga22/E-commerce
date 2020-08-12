import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProductCard from './components/product_card/ProductCard.jsx';

function App() {
  return (
    <div className="App">
    	<ProductCard/>
    	<ProductCard/>
    	<ProductCard/>
    	<ProductCard/>
    </div>
  );
}

export default App;
