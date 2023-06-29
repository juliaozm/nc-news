import { UserAvatar } from "components/UI/UserAvatar";

export const UserItem = ({ user }) => {
  return (
    <section className="flex items-center justify-between">
      <div className="ml-3 mr-3">
        <UserAvatar user={user} />
      </div>
      <p className="text-gray-700">{user.username}</p>
    </section>
  );
};
