//IMPORTANDO REACT
import React from "react";
import { Link } from "react-router-dom";

//IMPORTS PROPIOS
import defaultImg from "../../img/default.jpg";
import s from "./ProductCard.module.css";

export default function ProductCard(props) {
  return (
    <div className={s.card}>
      <Link to={`/product/${props.id}`}>
        <div className={s.image}>
          <img src={defaultImg} />
        </div>
      </Link>
      <div className={s.content}>
        <Link to={`/product/${props.id}`}>
          <h2>{props.name}</h2>
        </Link>{" "}
        <p>{props.description}</p>
        <h3>{"$ " + props.price}</h3>
      </div>
    </div>
  );
}
