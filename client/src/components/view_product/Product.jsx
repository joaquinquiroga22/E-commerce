import React, { useState, useEffect } from "react";

import { Container, Box, List } from "@material-ui/core";

import s from "./Product.module.css";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";

//Importamos de redux para poder conectar al estado y poder dispatchear actions
import { useSelector, useDispatch } from "react-redux";
//importamos la funcion a dispatchear
import { getProduct } from "../../actions/products.js";
import ReviewCard from "../reviews/ReviewCard";

export default function Product({ id }) {
  const [value, setValue] = useState(2);

  //definimos las constantes para usar las funciones y almacenar el estado
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.products);
  useEffect(() => {
    // axios.get(`http://localhost:3000/products/${id}`).then(function (response) {
    //   setInfo(response.data);
    //   console.log(response);
    // });

    dispatch(getProduct(id));
  }, [getProduct]);
  console.log(product);
  return (
    <Container
      display="flex"
      flexDirection="column"
      justifyContent="center"
      m={5}
    >
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
          <p className={s.e}> {product.description} </p>
          <h5> Quedan: {product.stock}</h5>
          <h3 className={s.num}> ${product.price} </h3>
          <Box>
            <Button variant="contained" color="secondary">
              Comprar ya
            </Button>
            <Button variant="contained" color="primary">
              Carrito
            </Button>
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
            Este Producto no posee reviews Aun{" "}
          </Typography>
        )}
      </Box>
    </Container>
  );
}
