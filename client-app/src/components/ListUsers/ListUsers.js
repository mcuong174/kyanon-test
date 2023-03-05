import axios from "axios";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

import "./listUserStyle.scss";

const ListUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const apiGetAllUsers = () => {
      axios
        .get("http://localhost:5000/users")
        .then((res) => {
          setUsers(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    apiGetAllUsers();
  }, []);

  return (
    <>
      <div className="list-user">
        <table>
          <thead className="table100-head">
            <tr>
              <th className="column1">Full Name</th>
              <th className="column2">Day Of Birth</th>
              <th className="column3">Email</th>
              <th className="column4">Phone</th>
              <th className="column5"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <th className="column1">{user.fullName}</th>
                <th className="column2">
                
                {new Date(user.dayOfBirth).toLocaleDateString('en-GB')}

                  {/* {new Date(user.dayOfBirth).toISOString().slice(0, 10)} */}
                </th>
                <th className="column3">{user.email}</th>
                <th className="column4">
                  {new Number(user.phone).toString().padStart(10, "0")}
                </th>
                <th className="column5">
                  <form action={`/users/${user.id}`} method="GET">
                    <button className="update">Edit</button>
                  </form>
                </th>
              </tr>
            ))}
            <tr></tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListUsers;
