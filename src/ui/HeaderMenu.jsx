import { useNavigate } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi2";

function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <ul className="flex gap-0.5">
      <li>
        <button onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </button>
      </li>
    </ul>
  );
}

export default HeaderMenu;
