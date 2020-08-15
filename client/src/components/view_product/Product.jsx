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

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const props = {
    title: "Flores de rama 5, hojas verdes tallo grande",
    description: "Hermosa flor para decorar el interior de tu casa",
    price: "$ " + 529,
    rating: "******",
    stock: "Quedan: " + 12,
    id: 3
}



export default function Product() {
    const [value, setValue] = React.useState(2);
    const classes = useStyles();
return (

    <div className={s.container} >
        
        <div className={s.img}>
            <img  className={s.imagen} src="https://via.placeholder.com/400" /> 
        </div>
        

        <div className={s.body}>
          <div className={s.izquierda}>
            <h2 className={s.title}> {props.title} </h2> 
            <p className={s.e}> {props.description} </p>
            <h5> {props.stock}</h5>
            <h3 className={s.num}> {props.price} </h3>
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