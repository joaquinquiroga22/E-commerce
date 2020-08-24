import React,{useState, useEffect} from 'react';
import s from './OrdersTable.module.css';
import axios from 'axios';

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
    useEffect(() => {
      axios.get("http://localhost:3000/orders").then((res) => {setOrders(res.data)})
    },[])


    return (<div className={s.container}>
        <table className={s.orders}>
            <caption>Gestion de ordenes</caption>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Id del usuario</th>
                    <th>Estado</th>
                    <th>Fecha de creacion</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
            {orders.length > 0 && orders.map((order) => {
              console.log(order)
              return (<tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.user.id}</td>
                  <td><p className={order.state === "cart" ? s.cart : s.normal}>{order.state}</p></td>
                  <td >{order.createdAt}</td>
                  <td>ver orden</td>
                </tr>)
            })}

            </tbody>
        </table>
    </div>)
}
