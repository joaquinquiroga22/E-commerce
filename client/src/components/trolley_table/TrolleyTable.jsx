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

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      marginBottom: theme.spacing(2)
    },
    "& .MuiBadge-root": {
      marginRight: theme.spacing(2)
    }
  }
}));
export default function TrolleyTable(){
  const classes = useStyles();
  const [count, setCount] = useState(1);
  const [products, setProducts] = useState([]);
  useEffect(() => {
   axios.get("http://localhost:3000/users/1/cart").then((res) => {setProducts(res.data)})
   
  },[])
    return ( <div className = {s.table}>
      <div className={classes.root}>
      </div>
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
              <td>
        <ButtonGroup>
          <Button
            aria-label="reduce"
            onClick={() => {
              setCount(Math.max(count - 1, 0));
            }}
          >
            <RemoveIcon fontSize="small" />
          </Button>
          <Button
            aria-label="increase"
            onClick={() => {
              setCount(count + 1);
            }}
          >
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
              </td>
              <td>Orquideas</td>
              <td>10</td>
              <td>10</td>
            </tr>  
            {products && products.map(producto => {
              return(
              <tr>
              <td>{producto.quantity}</td>
              <td></td>
              <td>{producto.price}</td>
              <td>{producto.productId}</td>
              </tr>
              )
            })} 
         </table>
  </div>
  )
}