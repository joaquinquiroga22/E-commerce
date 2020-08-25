import React, {useEffect, useState} from 'react';
import s from "./TrolleyTable.module.css";
import axios from 'axios';



export default function TrolleyTable(){
var total = 0;
  const [products, setProducts] = useState({});
  const [editableProducts, setEditableProducts] = useState({});
  //Obtengo del localStorage el item Cart
  var Cart = localStorage.getItem('Cart');
  Cart = JSON.parse(Cart);

  useEffect(() => {
    if(Cart === null){
      return setProducts([]);
    }
    var productos = {};
    Cart.forEach((producto) => {
      axios.get(`http://localhost:3000/products/${producto.productId}`).then((res) => {
        producto.maxQuantity = Number(res.data.stock);
      });
      productos[producto.productId] = producto;
    })
    setProducts(productos)
  },[editableProducts])

  const quantityChange = function(e){
    //localStorage.setItem('Cart', JSON.stringify(Cart));
    let id = Number(e.target.id);
    let tempProducts = products;

    tempProducts[id].quantity = e.target.value;
    setEditableProducts(tempProducts)
    let array = [];
    for(let key in tempProducts){
      array.push(tempProducts[key])
    }
    localStorage.setItem('Cart', JSON.stringify(array));
  }

  const deleteItem = function(e){
    let id = Number(e.target.id);
    let tempProducts = products;

    delete tempProducts[id];
    setEditableProducts(tempProducts);

    let array = [];
    for(let key in tempProducts){
      array.push(tempProducts[key])
    }
    localStorage.setItem('Cart', JSON.stringify(array));
  }
    return ( <div className = {s.table}>

      <table className = {s.title}>
        <caption>Carrito</caption>
         <thead>
                <tr>
                    <th >Borrar</th>
                    <th className={s.header}>Cantidad</th>
                    <th className={s.header}>Descripcion</th>
                    <th className={s.header}>Precio Unitario</th>
                    <th className={s.header}>SubTotal</th>
                </tr>
        </thead>
        <tbody>
            {products && Cart.map((producto) => {
              total += (producto.price * producto.quantity)
              return (<tr key={producto.productId}>
                <td><button id={producto.productId} onClick={deleteItem}>X</button></td>
                <td className={s.quantity}><input step="1" max={producto.maxQuantity} min="1" type="number" id={producto.productId} onChange={quantityChange} value={producto.quantity}/></td>
                <td>{producto.description}</td>
                <td>{producto.price}</td>
                <td>{producto.price * producto.quantity}</td>
              </tr>)
            })}
            <tr>
              <td></td>
              <td></td>
              <td className = {s.totalspan} colSpan = "2">
                <span className = {s.total}>Total:</span>
                {total}
              </td>
            </tr>
            </tbody>
            </table>
            </div>
  )
}
