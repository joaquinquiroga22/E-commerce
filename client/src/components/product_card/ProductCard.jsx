//IMPORTANDO REACT
import React from 'react';
//IMPORTANDO COMPONENTES DE MATERIAL IU
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

//IMPORTS PROPIOS
import defaultImg from '../../img/default.jpg';

//Estilos
const useStyles = makeStyles({
  root: {
  	backgroundColor: '#eee',
    maxWidth: 250,
    margin: '20px 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: "0px 0px 26px -2px rgba(0,0,0,0.69)",
    textDecoration: "none"
  },
  media: {
  	margin: 'auto',
  	width: '100%',
    height: 200,
  },

});

const props = {title: "Aloe vera",
description: "Soy una descripcion media floja jeje.",
price: 403,
cantidad: 31,
id: 3
}

export default function ProductCard() {
  const classes = useStyles();

  return (
    <Link to={`/product/${props.id}`}> 
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={defaultImg}
          title="Aloe vera"
        />
        <CardContent>    
    			<Typography gutterBottom variant="h5">{"$ " + props.price}</Typography>
					<Typography variant="h6">{props.title}</Typography>
					<Typography variant="body1">{props.description}</Typography>
				</CardContent>
			</CardActionArea>
    </Card>
    </Link>
  );

}
