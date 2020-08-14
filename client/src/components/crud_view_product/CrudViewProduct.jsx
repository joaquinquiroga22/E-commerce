import React from "react";
import testImage from "../../img/default.jpg";
import s from "./CrudViewProduct.module.css";
export default function CrudDeleteProduct() {
  const props = {
    name: "Aloe vera",
    description:
      "Plata con poderosos poderes curativos, todo este texto es solor para rellenar porque no tengo el lorem insupm jeje igual antes era chevere ajaj ajejkajfae ea eafjeaf eakfajnk sefseklfsef skelfsekflsefs klnfeslknflse seklsneflkneslkfnsel fselkflesknfls fklneslkfnselkfnes fesnfkesnlfsn fleksnflesnlfes feknslknfeskl fesknflseknfkles fleksnflkesnlkfse lfneslkfneslk lknfeslknfeslk klfeslknfels nfkesnflesn klfneslkfnselk",
    price: 403,
    image: testImage,
    stock: 32,
  };
  return (
    <form className={s.form}>
      <div className={s.viewProduct}>
        <div className={s.image}>
          <img src={testImage} />
        </div>
        <div className={s.info}>
          <h2>{props.name}</h2>
          <div>
            <h4>Descripcion</h4>
            <p>{props.description}</p>
          </div>
          <div>
            <h4>Precio</h4>
            <p>{props.price}</p>
          </div>
          <div>
            <h4>Stock</h4>
            <p>{props.stock}</p>
          </div>
        </div>
      </div>
      <div>
        <input className={s.deleteBtn} type="submit" value="Eliminar" />
        <input type="button" value="Cancelar" />
      </div>
    </form>
  );
}
