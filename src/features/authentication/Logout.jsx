import { useState } from "react";
import { HiArrowRightOnRectangle } from "react-icons/hi2";

import { useLogout } from "../../hooks/auth/useLogout";

import SpinnerMini from "../../ui/SpinnerMini";
import ButtonIcon from "../../ui/ButtonIcon";
import ConfirmDialog from "../../ui/ConfirmDialog";

function Logout() {
  const { logout, isLoading } = useLogout();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => setShowConfirm(true);

  const handleConfirm = () => {
    setShowConfirm(false);
    logout();
  };

  const handleCancel = () => setShowConfirm(false);

  return (
    <>
      <ButtonIcon disabled={isLoading} onClick={handleLogout}>
        {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
      </ButtonIcon>
      <ConfirmDialog
        open={showConfirm}
        title="Sair"
        message="Tem certeza que deseja sair da aplicação?"
        confirmLabel="Sair"
        cancelLabel="Cancelar"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        confirmVariant="secondary"
      />
    </>
  );
}

export default Logout;
