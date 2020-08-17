import React, { useState, useEffect } from "react";
import s from "./Catalogue.module.css";
import Axios from "axios";
import CategoriesItem from "../../components/categories_item/CategoriesItem.jsx";

//componentes
import ProductCard from "../../components/product_card/ProductCard.jsx";

export default function Catalogue() {
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  let categories = [
    { id: 1, name: "Macetas" },
    { id: 2, name: "Flores" },
    { id: 3, name: "Marijuana" },
  ];

  let productos = [
    {
      id: 1,
      name: "1",
      price: 50,
      description: "1111",
      image: "",
      categories: [3, 2],
    },
    {
      id: 2,
      name: "2",
      price: 50,
      description: "2222",
      image: "",
      categories: [2],
    },
    {
      id: 3,
      name: "3",
      price: 50,
      description: "3333",
      image: "",
      categories: [3],
    },
  ];
  const onCategoryChange = function (checkStatus, id) {
    if (checkStatus === true) {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  //  useEffect(() => {
  //    Axios.get("http://localhost:3000/products").then((res) =>
  //      setProducts(res.data)
  //    );
  //  });

  return (
    <div className={s.catalogue}>
      <div className={s.filters}>
        {categories.map(function (category) {
          return (
            <CategoriesItem
              key={category.id}
              id={category.id}
              name={category.name}
              setSelectCategory={onCategoryChange}
            />
          );
        })}
      </div>
      <div className={s.products}>
        <div className={s.listproducts}>
          {products.length > 0 ? (
            products.map(function (product) {
              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  description={product.description}
                  image={product.image}
                />
              );
            })
          ) : (
            <h1>No hay productos para mostrar</h1>
          )}
        </div>
      </div>
    </div>
  );
}
