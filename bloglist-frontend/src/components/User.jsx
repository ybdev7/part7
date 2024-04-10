const User = ({ user }) => {
  console.log("matched user=", user);
  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h5>added blogs</h5>
      <ul>
        {user.blogs.map((b) => (
          <li key={`blog_${b.id}`}>{b.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
