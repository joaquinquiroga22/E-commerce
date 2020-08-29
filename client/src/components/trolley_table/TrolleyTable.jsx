import React, { useEffect, useState } from "react";
import s from "./TrolleyTable.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart, setQuantity, removeFromCart } from "../../actions/cart";

import replaceChars from "../../helpers/replaceChars";

export default function TrolleyTable() {
  const dispatch = useDispatch();

  const [total, setTotal] = useState(0);

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    sumTotal();
    localStorage.setItem("Cart", JSON.stringify(cart));
  }, [cart]);

  const quantityChange = function (e) {
    let id = Number(e.target.id);
    let qty = Number(e.target.value);
    dispatch(setQuantity(id, qty));
  };

  const deleteItem = function (e) {
    let id = Number(e.target.id);
    dispatch(removeFromCart(id));
  };

  const sumSubTotal = function (quantity, price) {
    return Math.ceil(quantity * price);
  };

  const sumTotal = function () {
    let suma = 0;
    cart.products.forEach((prod) => {
      var stotal = prod.quantity * prod.price;
      suma += stotal;
    });
    setTotal(suma);
  };
  return (
    <div className={s.table}>
      <table className={s.title}>
        <caption>Carrito</caption>
        <thead>
          <tr>
            <th>Borrar</th>
            <th className={s.header}>Nombre</th>
            <th className={s.header}>Descripcion</th>
            <th className={s.header}>Cantidad</th>
            <th className={s.header}>Precio Unitario</th>
            <th className={s.header}>SubTotal</th>
          </tr>
        </thead>
        <tbody>
          {cart.products &&
            cart.products.map((producto) => {
              return (
                <tr key={producto.id}>
                  <td>
                    <button id={producto.id} onClick={deleteItem}>
                      X
                    </button>
                  </td>
                  <td>
                    <Link to={`/product/${producto.id}`}>
                      {replaceChars(producto.name)}
                    </Link>
                  </td>
                  <td>{producto.description}</td>
                  <td className={s.quantity}>
                    <input
                      step="1"
                      max={producto.stock}
                      min="1"
                      type="number"
                      id={producto.id}
                      onChange={quantityChange}
                      value={producto.quantity}
                    />
                  </td>
                  <td>{producto.price}</td>
                  <td>{sumSubTotal(producto.quantity, producto.price)}</td>
                </tr>
              );
            })}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className={s.totalspan} colSpan="2">
              <span className={s.total}>Total:</span>
              {total}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
