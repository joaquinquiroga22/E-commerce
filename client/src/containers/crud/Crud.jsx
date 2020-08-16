import React, { useState, useEffect } from "react";
import s from "./Crud.module.css";
import CrudHead from "../../components/crud/crud_head/CrudHead.jsx";
import CrudTitle from "../../components/crud/crud_list_title/CrudTitle.jsx";
import CrudListItem from "../../components/crud/crud_item/CrudItem.jsx";
import Axios from "axios";
import CrudAddProduct from "./../../components/crud/crud_add_product/CrudAddProduct.jsx";
import CrudEditProduct from "./../../components/crud/crud_update_product/CrudUpdateProduct.jsx";
import CrudDeleteProduct from "./../../components/crud/crud_delete_product/CrudDeleteProduct.jsx";

export default function Crud() {
  const [products, setProducts] = useState([]);
  const [renderAdd, setRenderAdd] = useState(false);
  const [renderEdit, setRenderEdit] = useState(false);
  const [updateId, setUpdateId] = useState();
  const [renderDelete, setRenderDelete] = useState(false);
  const [deleteId, setDeleteId] = useState();

  useEffect(() => {
    Axios.get(`http://localhost:3000/products`).then(function (response) {
      setProducts(response.data);
    }, []);
  });

  const updateRenderAdd = function (value) {
    setRenderAdd(value);
  };

  const updateRenderEdit = function (value, id) {
    setRenderEdit(value);
    setUpdateId(id);
  };

  const updateRenderDelete = function (value, id) {
    setRenderDelete(value);
    setDeleteId(id);
  };

  return (
    <div className={s.component}>
      {renderAdd && <CrudAddProduct onClose={updateRenderAdd} />}
      {renderEdit && (
        <CrudEditProduct id={updateId} onClose={updateRenderEdit} />
      )}
      {renderDelete && (
        <CrudDeleteProduct id={deleteId} onClose={updateRenderDelete} />
      )}
      <CrudHead onAddProduct={updateRenderAdd} />
      <CrudTitle />
      {products.map(function (product) {
        return (
          <CrudListItem
            onEditProduct={updateRenderEdit}
            onDeleteProduct={updateRenderDelete}
            key={product.id}
            product={product}
          />
        );
      })}
    </div>
  );
}
