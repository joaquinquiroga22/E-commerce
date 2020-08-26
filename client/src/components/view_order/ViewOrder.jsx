import React,{useState, useEffect} from "react";
import s from './ViewOrder.module.css';
import CloseBtn from '../close_btn/CloseBtn.jsx';
import axios from 'axios';

export default function EditOrder({onClose, id}){
  const [order, setOrder] = useState()
  const [items, setItems] = useState()
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState({
    state: "",
    address: "",
  })

  useEffect(() => {

    if(!items){
      axios.get(`http://localhost:3000/users/${id}/cart`).then((res) => setItems(res.data))
    }
    if(!order){
      axios.get(`http://localhost:3000/orders/${id}`).then((res) => {
        setOrder(res.data[0])
      })
    }
    setInput({
      state: order && order.state,
      address: order && order.address
    })
  },[order])

  const sumTotal = function(){
    let total = 0;
    for(let i = 0; i < items.length; i++){
      let subtotal = items[i].quantity * items[i].price;
      total+=subtotal;
    }
    return "$ "+total;
  }

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const onSave = function(){
    const data = {
      state: input.state === "" ? order.state : input.state,
      address: input.address
    }

    axios.put(`http://localhost:3000/orders/${id}`,data).then((res) => {
      alert("Actualizada con exito")
    })
  }

  const onClean = function(){
    axios.delete(`http://localhost:3000/users/${id}/cart`).then((res) => {
      alert("Vaciada con exito")
    })
  }

  if(!order || !items){
    return(<div className={s.viewOrder}>
      <div className={s.content}>
      <CloseBtn close={onClose}/>
        <h3>Cargando datos...</h3>
      </div>
    </div>)
  }

  return(<div className={s.viewOrder}>
      <div className={s.content}>
        <CloseBtn close={onClose}/>
        <h3>Panel de ordenes</h3>
        <div className={[s.info, s.topShadow].join(' ')}>
          <p><span>Email:</span>{" "+order.user.email}</p>
          <p><span>Rol:</span>{" "+order.user.role}</p>
        </div>
        <div className={[s.info, s.botShadow].join(' ')}>
          <p><span>ID:</span>{" "+order.id}</p>
          <p>
          <span>Estado: </span>
            {edit === true ? <select required onChange={handleInputChange} name="state" id="state">
              <option value="">Seleccione el nuevo estado</option>
              <option value="cart">Carrito</option>
              <option value="create">Creada</option>
              <option value="process">Procesando</option>
              <option value="canceled">Cancelada</option>
              <option value="completed">Completada</option>
            </select> : order.state}
          </p>
          <p>
            <span>Direccion: </span>
            {edit === true ? <input onChange={handleInputChange} name="address" value={input.address} type="text"/> : order.address}
          </p>
        </div>
        <table className={s.itemsTable}>
          <thead>
            <tr>
              <th>Descripcion</th>
              <th>Cantidad</th>
              <th>Precio c/u</th>
            </tr>
          </thead>
          <tbody>
          {items.map(function(item){
            return (<tr><td>{item.description}</td><td>{item.quantity}</td><td>{item.price}</td></tr>);
          })}
          <tr className={s.total}><td></td><td >Total:</td><td>{sumTotal()}</td></tr>
          </tbody>
        </table>
        <div className={s.actions}>
         <div className={s.editar}>
           <p>Editar</p>
           <label className={s.switch}>
             <input type="checkbox" onChange={() => setEdit(!edit)}/>
             <span className={[s.slider, s.round].join(' ')}></span>
           </label>
         </div>
         <div>
          <button onClick={onSave} className={[s.btn].join(' ')} disabled={!edit}>Guardar Cambios</button>
        </div>
        <div>
          <button onClick={onClean} className={[s.btn].join(' ')}>Vaciar orden</button>
        </div>
        <div>
          <button onClick={() => onClose(false)} className={[s.btn].join(' ')}>Salir</button>
        </div>

        </div>
      </div>
    </div>)
}
