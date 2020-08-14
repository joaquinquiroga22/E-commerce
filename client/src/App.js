import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./containers/navbar/Navbar.jsx";
import AddProductForm from "./components/add_product_form/AddProductForm.jsx";
function App() {
  return (
    <div className="App">
      <Navbar />
      <AddProductForm />
    </div>
  );
}

export default App;
