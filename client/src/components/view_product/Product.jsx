import React, { useState, useEffect } from "react";
import { Container, Box, Button } from "@material-ui/core";
import s from "./Product.module.css";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import ReviewCard from "../reviews/ReviewCard";
import Review from "../view_review/Review.jsx";
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
//Importamos de redux para poder conectar al estado y poder dispatchear actions
import { useSelector, useDispatch } from "react-redux";
//importamos la funcion a dispatchear
import { getProduct } from "../../actions/products.js";



const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Product({ id }) {
  const [renderUpdate, setRenderUpdate] = useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.products);

  //const setRenderUpdate = (value) => {
   //renderUpdate(value);
  //}
  useEffect(() => {
    dispatch(getProduct(id));
  }, [getProduct]);

  return (
    <Container

      display="flex"
      flexDirection="column"
      justifyContent="center"
      m={5}
    >
      {renderUpdate && <Review onClose = {setRenderUpdate}/> }
      <Box display="flex" justifyContent="center">
        <Box className={s.img}>
          <img className={s.imagen} alt={product.name} src={product.image} />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
        >
          <h2 className={s.title}> {product.name} </h2>
          <p className={s.e}> Descripción: {product.description} </p>
          <h5> Stock: {product.stock}</h5>
          <h3 className={s.num}> ${product.price} </h3>
          
        <Button onClick={setRenderUpdate}
        variant="contained"
        color= "default"
        className={classes.button}
        endIcon={<RateReviewOutlinedIcon/>}
        >
        Dar opinion:
        </Button>
          <Box>
            <Button variant="contained" color="secondary">
              Comprar ya
            </Button>
            <span> </span>
            <Link to= "/carrito">
            <Button variant="contained" color="primary">
              Carrito
            </Button>
            </Link>
          </Box>
        </Box>
      </Box>
      <Box m={5} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5"> Reviews </Typography>

        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review) => {
            return (
              <ReviewCard
                key={review.id}
                title={review.title}
                stars={review.stars}
                description={review.description}
                user={review.image}
                date={review.updatedAt}
              />
            );
          })
        ) : (
          <Typography variant="h6" color="error">
            {" "}
            Este producto no posee reviews aun{" "}
          </Typography>
        )}
      </Box>
    </Container>
  );
}
