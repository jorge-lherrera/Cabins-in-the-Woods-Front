import UserAvatar from "../features/authentication/UserAvatar";
import HeaderMenu from "../ui/HeaderMenu";
function Header() {
  return (
    <header className="bg-grey-0 px-20 py-5 border-b border-grey-100 flex gap-6 items-center justify-end">
      <UserAvatar />
      <HeaderMenu />
    </header>
  );
}

export default Header;
