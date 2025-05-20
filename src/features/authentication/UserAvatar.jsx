import { useUser } from "../../hooks/auth/useUser";

function UserAvatar() {
  const { user } = useUser();
  const { fullName, avatar } = user.user_metadata;

  return (
    <div className="flex gap-5 items-center font-medium text-[1.4rem] text-gray-600">
      <img
        className="block w-9 aspect-square object-cover object-center rounded-full outline outline-gray-100"
        src={avatar || "default-user.jpg"}
        alt={`Avatar of ${fullName}`}
      />
      <span>{fullName}</span>
    </div>
  );
}

export default UserAvatar;
