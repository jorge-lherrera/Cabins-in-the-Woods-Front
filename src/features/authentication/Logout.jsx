import { useState } from "react";
import { HiArrowRightOnRectangle } from "react-icons/hi2";

import SpinnerMini from "../../ui/SpinnerMini";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "../../hooks/auth/useLogout";
import ConfirmCancel from "../../ui/ConfirmCancel";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--backdrop-color, rgba(0, 0, 0, 0.3));
  backdrop-filter: blur(4px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
      {showConfirm && (
        <Overlay>
          <ConfirmCancel
            resourceName="logout"
            onConfirm={handleConfirm}
            onCloseModal={handleCancel}
            disabled={isLoading}
          />
        </Overlay>
      )}
    </>
  );
}

export default Logout;
