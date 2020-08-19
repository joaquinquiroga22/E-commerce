//IMPORTANDO REACT
import React from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
//IMPORTS PROPIOS
import defaultImg from "../../img/default.jpg";
import s from "./ProductCard.module.css";

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
            {props.name}
          </Link>
          <p>{props.description}</p>
        </div>
        <Link to={`/product/${props.id}`} className={s.buy}>
          <ShoppingCartIcon className={s.icon} />
          {"$ " + props.price}
        </Link>
      </div>
    </div>
  );
}
