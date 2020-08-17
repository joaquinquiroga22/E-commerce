import React from 'react';
import s from './Product.module.css'
import defaultImg from '../../img/default.jpg'
import PaymentIcon from '@material-ui/icons/Payment';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { useState, useEffect } from "react";


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


export default function Product({id}) {
    const [value, setValue] = React.useState(2);
    const [info, setInfo] = useState({})
    const classes = useStyles();

    useEffect(() => {
      axios.get(`http://localhost:3000/products/${id}`).then(function (response) {
        setInfo(response.data);
        console.log(response)
      }, []);
    });

  return (

    <div className={s.container} >
        
        <div className={s.img}>
            <img  className={s.imagen} src={info.image} /> 
        </div>
        

        <div className={s.body}>
          <div className={s.izquierda}>
            <h2 className={s.title}> {info.name} </h2> 
            <p className={s.e}> {info.description} </p>
            <h5> Quedan: {info.stock}</h5>
            <h3 className={s.num}> ${info.price} </h3>
            <div className={s.rating}> 
                <Box display="flex" flexDirection="row" component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend"> Opinion: </Typography>
                <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                setValue(newValue);
                }}
                />
                </Box>
            </div>
          </div>
            
          <div className={s.buttoms}>
            <Button variant="contained"> Comprar ya</Button>
            <Button variant="contained" color="primary"> Carrito </Button> 
          </div>
                  
                

            
            
         </div>

        
    </div> 

)
}