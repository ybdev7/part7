const User = ({ user }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <div>{user.blogs.length}</div>
    </div>
  );
};

export default User;
