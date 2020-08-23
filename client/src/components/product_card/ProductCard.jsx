//IMPORTANDO REACT
import React from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Button from "@material-ui/core/Button";
//IMPORTS PROPIOS
import defaultImg from "../../img/default.jpg";
import s from "./ProductCard.module.css";
import axios from "axios";

const shortText = function (text) {
  var newText = text.substring(0, 50);
  newText = newText.charAt(0).toUpperCase() + newText.slice(1)

  if (text.length > 50) {
    return newText + "...";
  }
  return newText;
};

const replaceChars = function (text) {
  var newText = text.split("_").join(" ");
  newText = newText.charAt(0).toUpperCase() + newText.slice(1)
  return newText;
};
//Boton buy
// <Link to={`/product/${props.id}`} className={s.buy}>
//   <ShoppingCartIcon className={s.icon} />
//   {"$ " + props.price}
// </Link>
//Boton agregar al carrito
// <div className={s.buttoms}>
//     <Button variant="contained" color="primary">
//       {" "}
//       Agregar al carrito{" "}
//     </Button>
//   </div>
export default function ProductCard(props) {
  console.log(props.id)
  const TrolleyItemAdd = function () {
  const data = {idProduct : props.id, state: "cart" , address: "calle siempre viva 123 " , quantity: 5}
  axios.post("http://localhost:3000/users/1/cart", data ).then((res) => {console.log(res.data)})
  }
  return (
    <div className={s.card}>
      <div className={s.image}>
          <img src={props.image !== '' ? props.image : defaultImg} />
      </div>
      <div className={s.content}>
        <div className={s.title}>
          <Link className={s.title} to={`/product/${props.id}`}>
            {replaceChars(props.name)}
          </Link>
        </div>
        <p className={s.price}>{"$ "+props.price}</p>
        <p className={s.description}>{shortText(props.description)}</p>
      </div>
      <div className={s.actions}>
        <button>Ver Producto</button>
        <button onClick = {TrolleyItemAdd}>Añadir al carrito</button>
      </div>
    </div>
  );
}
