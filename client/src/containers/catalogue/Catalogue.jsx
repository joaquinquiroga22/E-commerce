import React, { useState, useEffect } from "react";
import s from "./Catalogue.module.css";
import axios from "axios";
import FilterItem from "../../components/filter_item/FilterItem.jsx";

//componentes
import ProductCard from "../../components/product_card/ProductCard.jsx";

export default function Catalogue() {
  const [products, setProducts] = useState([]);
  const [showedProducts, setShowedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const params = new URLSearchParams(window.location.search);
  var query = params.get('buscar');



  useEffect(() => {
    axios.get("http://localhost:3000/products").then((res) => {
      setProducts(res.data);
    });

    axios.get("http://localhost:3000/products/category").then((res) => {
      setCategories(res.data);
    });

    //obteniendo los querys

    if(query !== null){
      axios.get(`http://localhost:3000/search?valor=${query}`).then(function (res) {
          setShowedProducts(res.data);
          query = "";
      });
    }
    if(query === null){
      axios.get("http://localhost:3000/products").then((res) => {
        setProducts(res.data);
        setShowedProducts(res.data);
      });
    }
  }, [query]);

  const replaceChars = function (text) {
    var newText = text.split("_").join(" ");
    newText = newText.charAt(0).toUpperCase() + newText.slice(1)
    return newText;
  };

  const getFilter = function (e) {
    let filterId = e.target.id;
    if (filterId !== "all") {
      axios
        .get(`http://localhost:3000/products/category?category=${filterId}`)
        .then((res) => {
          setShowedProducts(res.data[0].products);
        });
      return;
    }
    setShowedProducts(products);
  };

  return (
    <div className={s.catalogue}>
      <div
        id="filters"
        className={s.filters}
        onChange={(e) => {
          getFilter(e);
        }}
      >
        <div>
          <input type="radio" name="filter" value="all" id="all" />
          <label htmlFor="all">
            <h2>Todos los productos</h2>
          </label>
        </div>
        {categories.map(function (category) {
           return <FilterItem key={category.id} name={replaceChars(category.name)} id={category.id} />;
        })}
      </div>
      <div className={s.products}>
        <div className={s.listproducts}>
          {showedProducts.length > 0 ? (
            showedProducts.map(function (product) {
               if (product.stock <= 0) {
                 return "EL PRODUCTO NO ESTA DISPONIBLE"
               }else{
                 return (
                   <ProductCard
                     key={product.id}
                     id={product.id}
                     name={product.name}
                     stock={product.stock}
                     price={product.price}
                     description={product.description}
                     image={product.image}
                   />
                 );
               }
            })
          ) : (
            <h2>No hay productos para mostrar</h2>
          )}
        </div>
      </div>
    </div>
  );
}
