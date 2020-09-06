import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import cortada from "../../img/cortada.jpg";
// //const useStyles = makeStyles((theme) => ({
//   cardGrid: {
//     paddingTop: theme.spacing(8),
//     paddingLeft: theme.spacing(10),
//     paddingBottom: theme.spacing(8),
//   },
//   card: {
//     alignItems: "rigth",
//     height: "20%",
//     width: "100%",
//     display: "flex",
//     flexDirection: "column",
//   },
//   cardMedia: {
//     paddingTop: "56.25%", // 16:9
//   },
//   cardContent: {
//     flexGrow: 1,
//   },
// }));

const cards = [1];

function HomePage() {
  // const classes = useStyles();

  return (
    <main>
              
                <img width= "100%" src= {cortada}/>
               
      
    </main>
  );
}

export { HomePage };
