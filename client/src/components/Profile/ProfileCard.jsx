import React, { useState, useEffect } from "react";
import axios from "axios";
import ViewReset from "../view_reset/ViewReset";

export default function Profile({ id, onClose }) {
  const usuario = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState();
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState({});
  const [reset, setReset] = useState(0);
  const [renderReset, setRenderReset] = useState(false);

  useEffect(() => {
    if (usuario) {
      axios
        .get(`http://localhost:3000/auth/me`, { withCredentials: true })
        .then((res) => {
          setUser(res.data);
          setInput(res.data);
        });
    }
  }, [usuario]);

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const onSave = function () {
    const data = {
      email: input.email,
      name: input.name,
    };
    axios.put(`http://localhost:3000/users/${user.id}`, data).then((res) => {
      alert("Actualizado correctamente");
    });
  };

  const onViewReset = function (e) {
    setReset(Number(e.target.id));
    setRenderReset(true);
  };
  return (
    <div>
      <div>
        {renderReset && <ViewReset id={reset} onClose={setRenderReset} />}
        <h3>Bienvenido {user && user.name} a su Panel de usuario</h3>
        <div>
          <p>
            <span>Email: </span>
            {edit ? (
              <input
                type="text"
                name="email"
                onChange={handleInputChange}
                value={input.email}
                disabled={!edit}
              />
            ) : (
              user && user.email
            )}
          </p>
          <p>
            <span>Nombre: </span>
            {edit ? (
              <input
                type="text"
                name="name"
                onChange={handleInputChange}
                value={input.name}
                disabled={!edit}
              />
            ) : (
              user && user.name
            )}
          </p>
          <p>
            <span>Apellido: </span>
            {edit ? (
              <input
                type="text"
                name="lastname"
                onChange={handleInputChange}
                value={input.lastname}
                disabled={!edit}
              />
            ) : (
              user && user.lastname
            )}
          </p>
        </div>
        <div>
          <div>
            <p>Editar</p>
            <label>
              <input type="checkbox" onChange={() => setEdit(!edit)} />
              <span></span>
            </label>
          </div>
          <div>
            <button onClick={onSave} disabled={!edit}>
              Guardar Cambios
            </button>
          </div>
          <div>
            <button id={user && user.id} onClick={onViewReset}>
              Reset Password
            </button>
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
}
