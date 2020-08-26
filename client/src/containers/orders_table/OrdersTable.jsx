import React,{useState, useEffect} from 'react';
import s from './OrdersTable.module.css';
import axios from 'axios';
import ViewOrder from '../../components/view_order/ViewOrder.jsx';

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [renderViewOrder, setRenderViewOrder] = useState(false);
  const [editId, setEditId] = useState();

    useEffect(() => {
      axios.get("http://localhost:3000/orders").then((res) => {setOrders(res.data)})
    },[])

    const detailOrder = function(e){
      setRenderViewOrder(true);
      setEditId(Number(e.target.id));
    }
    return (<div className={s.container}>
      {renderViewOrder && <ViewOrder onClose={setRenderViewOrder} id={editId}/>}
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
              return (<tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.user.id}</td>
                  <td><p className={order.state === "cart" ? s.cart : s.normal}>{order.state}</p></td>
                  <td >{order.createdAt}</td>
                  <td><input id={order.id} onClick={detailOrder} type="button" value="Ver orden"/></td>
                </tr>)
            })}

            </tbody>
        </table>
    </div>)
}
