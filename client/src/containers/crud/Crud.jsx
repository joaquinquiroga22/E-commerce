import React from "react";
import s from "./Crud.module.css";
import Head from "../../components/crud/crud_head/CrudHead.jsx";
import CrudTitle from "../../components/crud/crud_list_title/CrudTitle.jsx";
import CrudListItem from "../../components/crud/crud_item/CrudItem.jsx";

export default function Home() {
  return (
    <div className={s.component}>
      <Head />
      <CrudTitle />
      <CrudListItem />
    </div>
  );
}
