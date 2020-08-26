import React, { useState, useEffect } from "react";
import s from "./category.module.css";
import CrudHead from "../../components/crud_categories/crud_head/CrudHead.jsx";
import CrudTitle from "../../components/crud_categories/crud_list_title/CrudTitle.jsx";
import CrudItem from "../../components/crud_categories/crud_item/CrudItem.jsx";
import axios from "axios";
import AddCategory from "../../components/crud_categories/add_category/AddCategory.jsx";
import DeleteCategory from "../../components/crud_categories/crud_delete_product/CrudDeleteCategory.jsx";
//REDUX
import { useSelector, useDispatch } from "react-redux";
import { getCategories, getCategoryById } from "../../actions/categories";

export default function Categories() {
  //obtiene la lista de categorias
  const { categories, category } = useSelector((state) => state.categories);
  //ANTERIOR => const [categories, setCategories] = useState([]);
  //Gestiona si se renderiza el componente CrudAddProduct
  const [renderAdd, setRenderAdd] = useState(false);
  //Gestiona si se renderiza el componente CrudEditProduct
  const [renderEdit, setRenderEdit] = useState(false);
  const [updateId, setUpdateId] = useState();
  const [deleteId, setDeleteId] = useState();
  const [renderDelete, setRenderDelete] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [categories]);

  const updateRenderAdd = function (value) {
    setRenderAdd(value);
    dispatch(getCategories());
  };

  const updateRenderEdit = function (value, id) {
    setRenderEdit(value);
    setUpdateId(id);
    dispatch(getCategories());
  };

  const updateRenderDelete = function (value, id) {
    setRenderDelete(value);
    setDeleteId(id);
    dispatch(getCategories());
  };

  return (
    <div className={s.component}>
      {renderAdd && <AddCategory type="Add" onClose={updateRenderAdd} />}

      {renderEdit && (
        <AddCategory id={updateId} type="Edit" onClose={updateRenderEdit} />
      )}

      {renderDelete && (
        <DeleteCategory id={deleteId} onClose={updateRenderDelete} />
      )}

      <CrudHead onAddCategory={updateRenderAdd} />
      <CrudTitle />
      {categories.length > 0 &&
        categories.map(function (category) {
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
