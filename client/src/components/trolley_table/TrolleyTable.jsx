import React, {useEffect, useState} from 'react';
import s from "./TrolleyTable.module.css";
import axios from 'axios';


export default function TrolleyTable(){

  const [products, setProducts] = useState([]);
  useEffect(() => {
   axios.get("http://localhost:3000/users/1/cart").then((res) => {setProducts(res.data)})
   
  },[])
    return ( <div className = {s.table}>
     
      <table className = {s.title}>
        <caption>Carrito</caption>
         <thead>
                <tr>
                    <th>Cantidad</th>
                    <th>Descripcion</th>
                    <th>Precio Unitario</th>
                    <th>Precio Total</th>
                </tr>
        </thead>  
        <tr>
          <td>hola</td>
          <td>holsdsdasdaa</td>
          <td>4342</td>
        </tr>
            {products && products.map(producto => {
            
              return(
              <tr>
              <td>{producto.quantity}</td>
              <td>{producto.description}</td>
              <td>{producto.price}</td>
              
              </tr>
            );
            })} 
            </table>
            </div>
  )
}