import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import { userActions } from "../../actions/user";

function HomePage() {
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getAll());
  }, []);

  function handleDeleteUser(id) {
    dispatch(userActions.delete(id));
  }

  return (
    <div>
      <Alert>
        Hi {user.data.name}!<p>Se ha logueado Correctamente</p>
      </Alert>

      {/* <h3>All registered users:</h3>
      {users.loading && <em>Loading users...</em>}
      {users.error && <span className="text-danger">ERROR: {users.error}</span>}
      {users.items && (
        <ul>
          {users.items.data.map((user, index) => (
            <li key={user.id}>
              {user.name + " " + user.lastname}
              {user.deleting ? (
                <em> - Deleting...</em>
              ) : user.deleteError ? (
                <span className="text-danger">- ERROR: {user.deleteError}</span>
              ) : (
                <span>
                  <a
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-primary"
                  >
                    Delete
                  </a>
                </span>
              )}
            </li>
          ))}
        </ul>
      )} */}
      <p>
        <Link to="/loginpage">Logout</Link>
      </p>
    </div>
  );
}

export { HomePage };
