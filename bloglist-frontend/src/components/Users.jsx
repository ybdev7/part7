import User from "./User";

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>

      <div>
        <table>
          <thead>
            <tr>
              <td></td>
              <td>
                <b>blogs created</b>
              </td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
