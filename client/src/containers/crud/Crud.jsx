import React, { useState, useEffect } from "react";
import s from "./Crud.module.css";
import CrudHead from "../../components/crud/crud_head/CrudHead.jsx";
import CrudTitle from "../../components/crud/crud_list_title/CrudTitle.jsx";
import CrudListItem from "../../components/crud/crud_item/CrudItem.jsx";
import axios from "axios";
import CrudAddProduct from "./../../components/crud/crud_add_product/CrudAddProduct.jsx";
import CrudDeleteProduct from "./../../components/crud/crud_delete_product/CrudDeleteProduct.jsx";
import AddCategory from "../../components/crud/add_category/AddCategory.jsx";

export default function Crud() {
  //obtiene la lista de productos
  const [products, setProducts] = useState([]);
  //Gestiona si se renderiza el componente CrudAddProduct
  const [renderAdd, setRenderAdd] = useState(false);
  //Gestiona si se renderiza el componente CrudEditProduct
  const [renderEdit, setRenderEdit] = useState(false);
  //Gestiona si se renderiza el componente CrudUpdate
  const [updateId, setUpdateId] = useState();
  const [renderDelete, setRenderDelete] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [renderCat, setRenderCat] = useState(false);
  const [fillTable, setFillTable] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3000/products`).then(function (response) {
      setProducts(response.data);
    });
  }, []);

  const updateRenderAdd = function (value) {
    setRenderAdd(value);
    setFillTable(!fillTable);
  };

  const updateRenderEdit = function (value, id) {
    setRenderEdit(value);
    setUpdateId(id);
  };

  const updateRenderDelete = function (value, id) {
    setRenderDelete(value);
    setDeleteId(id);
  };

  const updateRenderCategory = function (value) {
    setRenderCat(value);
  };

  return (
    <div className={s.component}>
      {renderAdd && <CrudAddProduct type="Add" onClose={updateRenderAdd} />}

      {renderEdit && (
        <CrudAddProduct id={updateId} type="Edit" onClose={updateRenderEdit} />
      )}

      {renderCat && <AddCategory onClose={updateRenderCategory} />}
      {renderDelete && (
        <CrudDeleteProduct id={deleteId} onClose={updateRenderDelete} />
      )}
      <CrudHead
        onAddCategory={updateRenderCategory}
        onAddProduct={updateRenderAdd}
      />
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
