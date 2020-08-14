import React from "react";
import testImage from "../../img/default.jpg";
export default function CrudDeleteProduct() {
  const props = {
    name: "Aloe vera",
    description: "Plata con poderosos poderes curativos",
    price: 403,
    image: testImage,
    stock: 32,
  };
  return (
    <div>
      <h1>
        <img src={props.image} />
        Holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      </h1>
      <br /> <p>hoplaaaaaa</p>
    </div>
  );
}
