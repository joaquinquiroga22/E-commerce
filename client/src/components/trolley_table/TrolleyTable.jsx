import React from 'react';
import s from "./TrolleyTable.module.css";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

export default function TrolleyTable(){
  return (<div className = {s.table}>
      <table className = {s.title}>
        <caption>Carrito</caption>
         <thead>
                <tr>
                    <th>Cantidad</th>
                    <th>Descripcion</th>
                    <th>Precio Unitario</th>
                    <th>Precio Total</th>
                </tr>
        </thead>
            <tr>
              <td>
              <ButtonGroup disableElevation variant="contained" color="primary">
              <Button>+</Button>
              <Button>-</Button>
              </ButtonGroup>
              </td>
              <td>Orquideas</td>
              <td>10</td>
              <td>10</td>
            </tr>
            <tr>
            <td>
              <ButtonGroup disableElevation variant="contained" color="primary">
              <Button>+</Button>
              <Button>-</Button>
              </ButtonGroup>
              </td>
              <td>Jasmines</td>
              <td>30</td>
              <td>30</td>
            </tr>
           <tr>
           <td>
              <ButtonGroup disableElevation variant="contained" color="primary">
              <Button>+</Button>
              <Button>-</Button>
              </ButtonGroup>
              </td>
          <td>Rosas</td>
          <td>20</td>
          <td>20</td>
           </tr>
         </table>
  </div>
  )
}