export const UserAvatar = ({ user }) => {
  return (
    <img
      src={user.avatar_url}
      className="h-8 w-8 rounded-full border object-contain object-center p-1 sm:h-10 sm:w-10 md:h-14 md:w-14 md:p-2"
    ></img>
  );
};
