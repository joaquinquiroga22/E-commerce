import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import Showmore from '../../components/showmore/Showmore.jsx';
import aloeVera from '../../img/aloevera.jpg';

const useStyles = makeStyles({
  root: {
  	border: '1px solid #000000',
    maxWidth: 345,
    margin: '20px'
  },
  media: {
    height: 200,
  },
  vermasBtn:{
  	position: 'relative',
  	left: '34%',
  	backgroundColor: '#00ADE5',
  	color:'white'
  }
});

const props = {title: "Aloe vera",
description: "loaekfje fefolekkfe felfekfelk felkfeklfe",
price: 403,
cantidad: 31
}

export default function Product() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={aloeVera}
          title="Aloe vera"
        />
        <CardContent>    
    <Typography gutterBottom variant="h5">{"$ " + props.price}</Typography>
		<Typography variant="h6">{props.title}</Typography>
		<Typography variant="body1">{props.description}</Typography>
		</CardContent>
      </CardActionArea>
      <CardActions>
				<Showmore />
      </CardActions>
    </Card>
  );
}
