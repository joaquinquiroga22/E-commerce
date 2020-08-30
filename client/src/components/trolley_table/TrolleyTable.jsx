import React, { useEffect, useState } from "react";
import s from "./TrolleyTable.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuantity,
  removeFromCart,
  getCart,
  emptyCart,
} from "../../actions/cart";
import Alert from "@material-ui/lab/Alert";
import { Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

//HELPERS
import replaceChars from "../../helpers/replaceChars";
import getOrCreateLocalStorage from "../../helpers/getLocalStorage";

export default function TrolleyTable() {
  const dispatch = useDispatch();

  const [total, setTotal] = useState(0);

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart(getOrCreateLocalStorage()));
  }, []);

  useEffect(() => {
    sumTotal();

    localStorage.setItem("Cart", JSON.stringify(cart.products));
  }, [cart]);

  const quantityChange = function (e) {
    let id = Number(e.target.id);
    let qty = Number(e.target.value);
    dispatch(setQuantity(id, qty));
  };

  const deleteItem = function (id) {
    console.log(`EL ID TIENE ${id}`);
    dispatch(removeFromCart(id));
  };

  const sumSubTotal = function (quantity, price) {
    return Math.ceil(quantity * price);
  };

  const emptyCarrito = () => {
    dispatch(emptyCart());
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
          {cart && cart.products.length > 0 ? (
            cart.products.map((producto) => {
              return (
                <tr key={producto.id}>
                  <td>
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteItem(producto.id)}
                      color="primary"
                    >
                      <DeleteIcon />
                    </IconButton>
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
            })
          ) : (
            <tr>
              <td></td>
              <td></td>
              <td className={s.totalspan} colSpan="2">
                <Alert severity="info"> El carrito esta vacio</Alert>
              </td>
              <td></td>
              <td></td>
            </tr>
          )}
          <tr>
            <td className={s.totalspan} colSpan="2">
              <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={emptyCarrito}
              >
                Vaciar Carrito
              </Button>
            </td>
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
