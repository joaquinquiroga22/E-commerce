import React, {useEffect, useState} from 'react';
import s from "./TrolleyTable.module.css";
import axios from 'axios';


export default function TrolleyTable(){
var total = 0;
  const [products, setProducts] = useState([]);
  useEffect(() => {
   axios.get("http://localhost:3000/users/6/cart").then((res) => {setProducts(res.data)})
   
  },[])
    return ( <div className = {s.table}>
     
      <table className = {s.title}>
        <caption>Carrito</caption>
         <thead>
                <tr>
                    <th>Cantidad</th>
                    <th>Descripcion</th>
                    <th>Precio Unitario</th>
                    <th>SubTotal</th>
                </tr>
        </thead>  
            {products && products.map(producto => {
               total += (producto.price * producto.quantity)
              return(
                <tr>
              <td>{producto.quantity}</td>
              <td>{producto.description}</td>
              <td>{producto.price}</td>
              <td>{producto.price * producto.quantity}</td>
              </tr>
            );
          })} 
            <tr>
              <td></td>
              <td></td>
              <td className = {s.totalspan} colspan = "2">
                <span className = {s.total}>Total:</span>
                {total}
              </td>
            </tr>
            </table>
            </div>
  )
}