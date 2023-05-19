export const UserAvatar = ({ user }) => {
  return (
    <section className="flex items-center justify-between">
      <div className="ml-3 mr-3 w-12">
        <img
          src={user.avatar_url}
          className="h-full w-full object-contain"
        ></img>
      </div>
      <p className="font-medium">
        Welcome, <br /> {user.username}!
      </p>
    </section>
  );
};
