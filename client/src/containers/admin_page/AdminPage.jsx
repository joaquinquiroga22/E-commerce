import React,{useEffect, useState} from 'react';
import s from './AdminPage.module.css';
import Crud from '../crud/Crud.jsx';
import OrdersTable from '../orders_table/OrdersTable.jsx';
import Categories from '../category_page/CategoryAdmin.jsx'
import PermMediaIcon from '@material-ui/icons/PermMedia';

//material ui
import ReceiptIcon from '@material-ui/icons/Receipt';
import StoreIcon from '@material-ui/icons/Store';


export default function AdminPage() {
  const [component, setComponent] = useState();
  useEffect(() => {
    let temp = <h3>Bienvenido al panel de administracion</h3>;
    setComponent(temp)
  }, []);

  const renderComponent = function(e){
    var element;
      switch (e.target.id) {
        case "manage_orders":
          element = <OrdersTable />;
          break;
        case "manage_products":
            element = <Crud />;
            break;
        case "manage_categories":
            element = <Categories />;
            break;
        default:
          element = <h2>Bienvenido a el panel de administracion</h2>;
          break;
      }
      setComponent(element);
  }

 return (<div className={s.admin}>
        <div className={s.aside}>
          <h3>Menu</h3>
          <input type="radio" onChange={(e) => renderComponent(e)} id="manage_orders" name="menu" value="orders"/>
          <label htmlFor="manage_orders"><ReceiptIcon className={s.icon} />Lista de ordenes</label>
          <input type="radio" onChange={(e) => renderComponent(e)} id="manage_products" name="menu" value="products"/>
          <label htmlFor="manage_products"><StoreIcon className={s.icon} />Gestion de productos</label>
          <input type="radio" onChange={(e) => renderComponent(e)} id="manage_categories" name="menu" value="categories"/>
          <label htmlFor="manage_categories"><PermMediaIcon className={s.icon} />Gestion de categorias</label>
        </div>
        <div className={s.main}>
          {component && component}
        </div>
    </div>)
}
