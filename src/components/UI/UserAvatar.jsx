export const UserAvatar = ({ user }) => {
  return (
    <img
      src={user.avatar_url}
      className="h-10 w-10 rounded-full border object-contain object-center p-1 md:h-14 md:w-14 md:p-2"
    ></img>
  );
};
