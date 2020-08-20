import React from 'react';
import s from './OrdersTable.module.css';
export default function OrdersTable() {

    return (<div className={s.container}>
        <table className={s.orders}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Id del usuario</th>
                    <th>Estado</th>
                    <th>Cantidad de productos</th>
                    <th>Fecha de creacion</th>
                    <th>$ Total</th>
                    <th>Acciones</th>

                </tr>
            </thead>

            <tr>
                <td>304</td>
                <td>3</td>
                <td>Carrito</td>
                <td>7</td>
                <td>20/08/2020</td>
                <td>$ 3455.94</td>
                <td>Ver orden</td>
            </tr>
            <tr>
                <td>255</td>
                <td>2</td>
                <td>Carrito</td>
                <td>3</td>
                <td>20/08/2020</td>
                <td>$ 1330.99</td>
                <td>Ver orden</td>

            </tr>
            <tr>
                <td>255</td>
                <td>2</td>
                <td>Carrito</td>
                <td>3</td>
                <td>20/08/2020</td>
                <td>$ 1330.99</td>
                <td>Ver orden</td>

            </tr>
        </table>
    </div>)
}
