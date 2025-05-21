import { useUser } from "../../hooks/auth/useUser";

function UserAvatar() {
  const { user } = useUser();

  const name = user?.name || user?.worker?.name || "Usuário";
  const avatar = user?.avatar || "default-user.jpg";

  return (
    <div className="flex items-center gap-5 text-[1.4rem] font-medium text-gray-600">
      <img
        className="block aspect-square w-9 rounded-full object-cover object-center outline outline-gray-100"
        src={avatar}
        alt={`Avatar of ${name}`}
      />
      <span>{name}</span>
    </div>
  );
}

export default UserAvatar;
