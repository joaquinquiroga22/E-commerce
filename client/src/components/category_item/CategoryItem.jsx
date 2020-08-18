import React from "react";

export default function CategoryItem({ id, name, onCheck }) {
  return (
    <div>
      <input
        type="checkbox"
        value={id}
        id={id}
        name={name}
        onChange={onCheck}
      />
      <label htmlFor={id}>{name}</label>
    </div>
  );
}
