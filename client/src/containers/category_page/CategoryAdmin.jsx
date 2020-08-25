import React, { useState, useEffect } from "react";
import s from "./category.module.css";  
import CrudHead from "../../components/crud_categories/crud_head/CrudHead.jsx";
import CrudTitle from "../../components/crud_categories/crud_list_title/CrudTitle.jsx";
import CrudItem from "../../components/crud_categories/crud_item/CrudItem.jsx";
import axios from "axios";
import AddCategory from "../../components/crud_categories/add_category/AddCategory.jsx";
import DeleteCategory from "../../components/crud_categories/crud_delete_product/CrudDeleteCategory.jsx";

export default function Categories() {
  //obtiene la lista de categorias
  const [categories, setCategories] = useState([]);
  //Gestiona si se renderiza el componente CrudAddProduct
  const [renderAdd, setRenderAdd] = useState(false);
  //Gestiona si se renderiza el componente CrudEditProduct
  const [renderEdit, setRenderEdit] = useState(false);
  const [updateId, setUpdateId] = useState();
  const [deleteId, setDeleteId] = useState();
  const [renderDelete, setRenderDelete] = useState(false);



  useEffect(() => {
    getCategories();
  },[categories]);

  const getCategories = function(){
    axios.get("http://localhost:3000/products/category").then(function(res) {
      if(res.data.length !== categories.length){
        return setCategories(res.data);
      }
    });
  }

  const updateRenderAdd = function (value) {
    setRenderAdd(value);
    getCategories();
  };

  const updateRenderEdit = function (value, id) {
    setRenderEdit(value);
    setUpdateId(id)
    getCategories();
  };

  const updateRenderDelete = function (value, id) {
    setRenderDelete(value);
    setDeleteId(id);
    getCategories();
  };

//   const updateRenderCategory = function (value) {
//     setRenderCat(value);
//   };

  return (
      
    <div className={s.component}>
        {renderAdd && <AddCategory type="Add" onClose={updateRenderAdd} />}

        {renderEdit && (<AddCategory id={updateId} type="Edit" onClose={updateRenderEdit} /> )}

        {renderDelete && (
        <DeleteCategory id={deleteId} onClose={updateRenderDelete} />
        )}

        <CrudHead onAddCategory={updateRenderAdd} />
        <CrudTitle />
        {categories.length > 0 && categories.map(function (category) {
        return (
          <CrudItem
            onEditCategory={updateRenderEdit}
            onDeleteCategory={updateRenderDelete}
            key={category.id}
            category={category}
          />
        );
      })}

    </div>
  );
}
