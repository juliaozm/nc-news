import { UserAvatar } from "components/UI/UserAvatar";

export const UserItem = ({ user }) => {
  return (
    <section className="flex items-center justify-between">
      <div className="ml-3 mr-1 md:mr-2">
        <UserAvatar user={user} />
      </div>
      <p className="text-ellipsis text-sm text-neutral-500 sm:text-base">
        {user.username}
      </p>
    </section>
  );
};
