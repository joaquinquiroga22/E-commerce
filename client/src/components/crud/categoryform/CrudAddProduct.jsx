import React from "react";
import axios from 'axios';
import s from "./CrudAddProduct.module.css";
import testImagen from "../../../img/default.jpg";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {useState} from 'react'


export default function AddC() {
  const [input, setInput] = useState({
    name: "",
    description: ""
  })

  const handleInputChange = function(e){
    setInput({
      ...input,
      [e.target.name] : e.target.value  

    })
  }

  const handleSubmit = function(e){
    e.preventDefault()

    const data = {
      name: input.name,
      description: input.description
    }

    axios.post("http://localhost:3000/products/category", data ).then((res) => {
      console.log(res.data)
    })
  }


  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <div className={s.image}>
        <img src={testImagen} />
      </div>
      <div className={s.inputs}>
        <label for="nombre" autocomplete="false">
          Nombre de la categoria: 
        </label>
        <input type="text" 
          name="name"
          value={input.name}
          onChange={handleInputChange}
        />
        <label htmlFor="description">Descripcion:</label>
          <textarea
            onChange={handleInputChange}
            name="description"
            rows="5"
            placeholder="Describe la nueva categoria"
          ></textarea>

        <label for="imagen">Imagen de la categoria: </label>
        <input type="file" name="imagen" />
        <input type="submit" value="Agregar Categoria" />
        <Link to='/'> <input type="submit" value="Cancelar" />  </Link>

      </div>
    </form>
  );
}
