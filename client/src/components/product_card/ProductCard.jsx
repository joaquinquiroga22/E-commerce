//IMPORTANDO REACT
import React from "react";
import { Link } from "react-router-dom";
//IMPORTS PROPIOS
import defaultImg from "../../img/default.jpg";
import s from "./ProductCard.module.css";
import replaceChars from "../../helpers/replaceChars";

import { useDispatch } from "react-redux";
import { getCart } from "../../actions/cart";

const shortText = function (text) {
  var newText = text.substring(0, 50);
  newText = newText.charAt(0).toUpperCase() + newText.slice(1);

  if (text.length > 50) {
    return newText + "...";
  }
  return newText;
};

export default function ProductCard(props) {
  const dispatch = useDispatch();

  const addToCart = function () {
    var data = {
      productId: props.id,
      name: props.name,
      description: props.description,
      price: props.price,
      quantity: 1,
    };
    //Obtengo del localStorage el item Cart
    var Cart = localStorage.getItem("Cart");
    //Si no existe lo creo
    if (Cart === null) {
      localStorage.setItem("Cart", JSON.stringify([]));
      Cart = localStorage.getItem("Cart");
    }
    Cart = JSON.parse(Cart);
    for (let i = 0; i < Cart.length; i++) {
      if (Cart[i].productId === data.productId) {
        alert("Ya tienes este producto en tu carrito.");
        return;
      }
    }
    Cart.push(data);
    localStorage.setItem("Cart", JSON.stringify(Cart));
    dispatch(getCart());
  };
  return (
    <div className={s.card}>
      <div className={s.image}>
        <img
          src={props.image !== "" ? props.image : defaultImg}
          alt={props.name}
        />
      </div>
      <div className={s.content}>
        <div className={s.title}>
          <p>{replaceChars(props.name)}</p>
        </div>
        <p className={s.price}>{"$ " + props.price}</p>
        <p className={s.description}>{shortText(props.description)}</p>
      </div>
      <div className={s.actions}>
        <Link className={s.title} to={`/product/${props.id}`}>
          <button>Ver Producto</button>
        </Link>
        <button onClick={addToCart}>Añadir al carrito</button>
      </div>
    </div>
  );
}
