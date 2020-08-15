import React from 'react'
import s from './product.module.css'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

const props = {
    id: 43, 
    name: "Aloe Vera",
    price: "$" + 450,
    category: "Flores"
}

export default function Home(){
    return (
        <div className={s.component}> 
            <div className={s.div}> {props.id} </div>
            <div className={s.div}> {props.name} </div>
            <div className={s.div}> {props.price} </div>
            <div className={s.div}> {props.category} </div>
            
            <div className={s.buttons}> 
                 <Link to='/edit'> <Button variant="contained" color="primary" className={s.button}> Editar </Button> </Link>
                 <Button variant="contained" color="secondary" className={s.button}> Eliminar </Button> 
            </div>
        </div>
    )
}