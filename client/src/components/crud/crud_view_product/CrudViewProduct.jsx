import React, { useState, useEffect } from "react";
import testImage from "../../../img/default.jpg";
import s from "./CrudViewProduct.module.css";
import axios from "axios";

//Importamos de redux para poder conectar al estado y poder dispatchear actions
import { useSelector, useDispatch } from "react-redux";
//importamos la funcion a dispatchear
import { getProductCategory } from "../../actions/products.js";

export default function CrudDeleteProduct() {
  const [render, setRender] = useState(true);
  // const [product, setProduct] = useState({
  //   name: "",
  //   price: 0,
  //   description: "",
  //   stock: 0,
  //   image:''
  // });
  const dispatch = useDispatch();
  const { productsCategory } = useSelector((state) => state.productsCategory);

  useEffect(() => {}, []);

  const closeView = function () {
    setRender(false);
  };

  if (render) {
    return (
      <form className={s.form}>
        <div className={s.viewProduct}>
          <div className={s.image}>
            <img src={testImage} />
          </div>
          <div className={s.info}>
            <h2>{product.name}</h2>
            <div>
              <h4>Descripcion</h4>
              <p>{product.description}</p>
            </div>
            <div>
              <h4>Precio</h4>
              <p>{product.price}</p>
            </div>
            <div>
              <h4>Stock</h4>
              <p>{product.stock}</p>
            </div>
          </div>
        </div>
        <div>
          <input type="button" value="Cerrar" onClick={closeView} />
        </div>
      </form>
    );
  }

  return null;
}
