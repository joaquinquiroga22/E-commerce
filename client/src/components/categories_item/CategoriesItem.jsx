import React, { useState } from "react";

export default function CategoriesItem({ name, id, setSelectCategory }) {
  return (
    <div>
      <label htmlFor={id}>{name}</label>
      <input type="checkbox" id={id} value={id} />
    </div>
  );
}
