import React from "react";
import s from "./CloseBtn.module.css";
export default function CloseBtn({close}) {
  console.log(close + "aca estoy")
  return (
       <input
       type="button"
       value="X"
       className={s.closeBtn}
       onClick={() => close(false)}
     />
  );
}
