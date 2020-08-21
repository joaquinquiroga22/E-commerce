//IMPORTANDO REACT
import React from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Button from "@material-ui/core/Button";
//IMPORTS PROPIOS
import defaultImg from "../../img/default.jpg";
import s from "./ProductCard.module.css";

const shortText = function (text) {
  var newText = text.substring(0, 200);

  if (text.length > 200) {
    return newText + "...";
  }
  return text;
};

const replaceChars = function (text) {
  var newText = text.split("_").join(" ");
  return newText;
};

export default function ProductCard(props) {
  return (
    <div className={s.card}>
      <Link to={`/product/${props.id}`}>
        <div className={s.image}>
          <img src={props.image} />
        </div>
      </Link>
      <div className={s.content}>
        <div className={s.above}>
          <Link className={s.link} to={`/product/${props.id}`}>
            {replaceChars(props.name)}
          </Link>
          <p>{shortText(props.description)}</p>
        </div>
        <Link to={`/product/${props.id}`} className={s.buy}>
          <ShoppingCartIcon className={s.icon} />
          {"$ " + props.price}
        </Link>
      </div>
      <div className={s.buttoms}>
          <Button variant="contained" color="primary">
            {" "}
            Agregar al carrito{" "}
          </Button>
        </div>
    </div>
  );
}
