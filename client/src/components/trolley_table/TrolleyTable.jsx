import React, { useEffect, useState } from "react";
import s from "./TrolleyTable.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCart } from "../../actions/cart";

export default function TrolleyTable() {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState({});
  const [editableProducts, setEditableProducts] = useState({});
  //Obtengo del localStorage el item Cart
  var Cart = localStorage.getItem("Cart");
  Cart = JSON.parse(Cart);

  useEffect(() => {
    if (Cart === null) {
      return setProducts([]);
    }
    var productos = {};
    Cart.forEach((producto) => {
      axios
        .get(`http://localhost:3000/products/${producto.productId}`)
        .then((res) => {
          producto.maxQuantity = Number(res.data.stock);
        });
      productos[producto.productId] = producto;
    });
    setProducts(productos);
  }, [editableProducts]);

  const quantityChange = function (e) {
    //localStorage.setItem('Cart', JSON.stringify(Cart));
    let id = Number(e.target.id);
    let tempProducts = products;
    if (e.target.value > tempProducts[id].maxQuantity) {
      e.target.value = tempProducts[id].maxQuantity;
    }
    if (e.target.value < 1) {
      e.target.value = 1;
    }
    tempProducts[id].quantity = e.target.value;
    setEditableProducts(tempProducts);
    let array = [];
    for (let key in tempProducts) {
      array.push(tempProducts[key]);
    }
    localStorage.setItem("Cart", JSON.stringify(array));
  };

  const deleteItem = function (e) {
    let id = Number(e.target.id);
    let tempProducts = products;

    delete tempProducts[id];
    setEditableProducts(tempProducts);

    let array = [];
    for (let key in tempProducts) {
      array.push(tempProducts[key]);
    }
    localStorage.setItem("Cart", JSON.stringify(array));
    dispatch(getCart());
  };

  const sumSubTotal = function (quantity, price) {
    return Math.ceil(quantity * price);
  };
  const sumTotal = function () {
    let newTotal = 0;
    let tempProducts = products;
    for (let key in tempProducts) {
      let subtotal = sumSubTotal(
        tempProducts[key].quantity,
        tempProducts[key].price
      );
      newTotal += subtotal;
    }
    return newTotal;
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
          {Cart &&
            Cart.map((producto) => {
              return (
                <tr key={producto.productId}>
                  <td>
                    <button id={producto.productId} onClick={deleteItem}>
                      X
                    </button>
                  </td>
                  <td>
                    <Link to={`/product/${producto.productId}`}>
                      {producto.name}
                    </Link>
                  </td>
                  <td>{producto.description}</td>
                  <td className={s.quantity}>
                    <input
                      step="1"
                      max={producto.maxQuantity}
                      min="1"
                      type="number"
                      id={producto.productId}
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
              {sumTotal()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
