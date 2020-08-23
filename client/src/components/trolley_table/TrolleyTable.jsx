import React, {useEffect, useState} from 'react';
import s from "./TrolleyTable.module.css";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import axios from 'axios';


export default function TrolleyTable(){
 
  const [products, setProducts] = useState([]);
  useEffect(() => {
   axios.get("http://localhost:3000/users/1/cart").then((res) => {console.log(res.data)})
   
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
                <td>{producto.idProduct}</td>
              <td>{producto.description}</td>
              </tr>
            );
            })} 
            </table>
            </div>
  )
}