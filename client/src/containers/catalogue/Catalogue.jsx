import React from "react";
import s from "./Catalogue.module.css";

//componentes
import ProductCard from "../../components/product_card/ProductCard.jsx";
const products = [
  {
    id: 1,
    name: "aloe vera",
    price: 23,
    description: "esta es una planta que te cura para toda la vida rey",
  },
  {
    id: 2,
    name: "aloe vera",
    price: 23,
    description: "esta es una planta que te cura para toda la vida rey",
  },
  {
    id: 3,
    name: "aloe vera",
    price: 23,
    description: "esta es una planta que te cura para toda la vida rey",
  },
  {
    id: 4,
    name: "aloe vera",
    price: 23,
    description: "esta es una planta que te cura para toda la vida rey",
  },
  {
    id: 5,
    name: "aloe vera",
    price: 23,
    description: "esta es una planta que te cura para toda la vida rey",
  },

  {
    id: 6,
    name: "aloe vera",
    price: 23,
    description: "esta es una planta que te cura para toda la vida rey",
  },
  {
    id: 7,
    name: "aloe vera",
    price: 23,
    description: "esta es una planta que te cura para toda la vida rey",
  },
];

export default function Catalogue() {
  return (
    <div className={s.catalogue}>
      <div className={s.filters}> Aca iran los filtros</div>
      <div className={s.products}>
        <div className={s.listproducts}>
          {products.map(function (product) {
            return (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                description={product.description}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
