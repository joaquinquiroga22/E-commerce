import React,{useEffect, useState} from 'react';
import s from './UsersPanel.module.css';
import axios from 'axios';
import ViewUser from "../../components/view_user/ViewUser.jsx";

export default function UsersPanel(){
  const [users,setUsers] = useState();
  const [renderViewUser, setRenderViewUser] = useState(false);
  const [viewId, setViewId] = useState(0);

  useEffect(() => {
    getUsers("mounted")
  },[users])

  useEffect(() => {
    getUsers("update")
  },[renderViewUser])

  const getUsers = function(type){
    if(type === "mounted"){
      axios.get("http://localhost:3000/users").then((res) => {
        if(!users){
          setUsers(res.data);
        }
      });
    }
    if(type === "update"){
      axios.get("http://localhost:3000/users").then((res) => {
        setUsers(res.data);
      });
    }

  }

  const onViewUser = function(e){
    setViewId(Number(e.target.id));
    setRenderViewUser(true)
  }


  if(!users){
    return (<h1>Cargando...</h1>)
  }

  return (<div className={s.container}>
          {renderViewUser && <ViewUser id={viewId} onClose={setRenderViewUser} />}
          <table className={s.usersTable}>
          <caption>Administración de usuarios</caption>
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 && users.map(function(user){
                return (<tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td><button id={user.id} onClick={onViewUser}>Ver usuario</button></td>
                      </tr>)
              })}
            </tbody>

          </table>
          </div>);
}
