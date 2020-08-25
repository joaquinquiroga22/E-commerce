import React, { useState, useEffect } from "react";
import s from "./Catalogue.module.css";
import axios from "axios";
import FilterItem from "../../components/filter_item/FilterItem.jsx";
import { useSelector, useDispatch } from "react-redux";

//Actions para dispatcehar
import { getProducts, searchProduct } from "../../actions/products";
import { getCategories, getCategoryProduct } from "../../actions/categories";

//componentes
import ProductCard from "../../components/product_card/ProductCard.jsx";

export default function Catalogue() {
  // Redux - Store:
  //State de products
  const products = useSelector((state) => state.products.products);

  //State de producos en x Categoria
  const categoryProducts = useSelector(
    (state) => state.categories.categoryProducts
  );

  //State con Categorias
  const categories = useSelector((state) => state.categories.categories);

  //State que tiene resultados de la busqueda
  const prodSearch = useSelector((state) => state.products.prodSearch);

  //State para saber que state mapear para renderizar productCard
  const [dataToRender, setDataToRender] = useState(products);

  const params = new URLSearchParams(window.location.search);
  var query = params.get("buscar");

  //Para Dispatchear las Acciones
  const dispatch = useDispatch();

  useEffect(() => {
    //Actions para traer todos los productos y categorias
    dispatch(getProducts());
    dispatch(getCategories());

    if (query !== null) {
      dispatch(searchProduct(query));
      setDataToRender(prodSearch);
    }

    if (query === null) {
      setDataToRender(products);
    }
  }, [query, getCategories, getProducts, searchProduct]);

  const replaceChars = function (text) {
    var newText = text.split("_").join(" ");
    newText = newText.charAt(0).toUpperCase() + newText.slice(1);
    return newText;
  };

  //Filtra Productos de acuerdo a la Categoria Seleccionada
  const getFilter = function (e) {
    let filterId = e.target.id;
    if (filterId !== "all") {
      dispatch(getCategoryProduct(filterId));
      setDataToRender(categoryProducts);
    }
    if (filterId === "all") {
      setDataToRender(products);
    }
  };

  console.log(dataToRender);
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
          return (
            <FilterItem
              key={category.id}
              name={replaceChars(category.name)}
              id={category.id}
            />
          );
        })}
      </div>
      <div className={s.products}>
        <div className={s.listproducts}>
          {dataToRender.length > 0 ? (
            dataToRender.map(function (product) {
              if (product.stock <= 0) {
                return "EL PRODUCTO NO ESTA DISPONIBLE";
              } else {
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
