import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useSession } from "../../hooks/auth/useSession";
import { useUpdateWorker } from "../../hooks/workers/useUpdateWorker";
import { makeAllFieldsOptional } from "../../utils/makeAllFieldsOptional";
import { usePrompt } from "../../hooks/usePrompt";

import workerValidation from "../../validations/workerValidations";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import ConfirmDialog from "../../ui/ConfirmDialog";

function UpdateWorkerForm() {
  const { data: session } = useSession();
  const user = session?.user || session;
  const { updateWorker, isUpdating } = useUpdateWorker();
  const navigate = useNavigate();

  const workerUpdateValidationSchema = makeAllFieldsOptional(workerValidation);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
    watch,
    setError,
  } = useForm({
    resolver: yupResolver(workerUpdateValidationSchema),
    defaultValues: {
      name: undefined,
      avatar: null,
      password: undefined,
      confirmPassword: undefined,
      currentPassword: undefined,
    },
    mode: "onChange",
  });

  const watchedFields = watch();
  const hasChanges = Object.keys(dirtyFields).length > 0;

  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  usePrompt(hasChanges, () => {
    setShowConfirm(true);
    setPendingAction(() => () => navigate(-1));
    return false;
  });

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasChanges]);

  function onSubmit({
    name,
    avatar,
    password,
    currentPassword,
    confirmPassword,
  }) {
    const dataToSend = {};
    if (dirtyFields.name) dataToSend.name = name;
    if (avatar && avatar.length > 0) dataToSend.avatar = avatar[0];
    if (password && currentPassword && confirmPassword) {
      dataToSend.password = password;
      dataToSend.currentPassword = currentPassword;
    }

    updateWorker(dataToSend, {
      setError,
      onSuccess: () => {
        reset();
        navigate("/dashboard", { replace: true });
      },
    });
  }

  if (isUpdating) return <Spinner />;

  function handleCancel() {
    if (hasChanges) {
      setShowConfirm(true);
      setPendingAction(() => () => navigate("/dashboard", { replace: true }));
    } else {
      navigate("/dashboard", { replace: true });
    }
  }

  function handleConfirmLeave() {
    setShowConfirm(false);
    if (pendingAction) pendingAction();
  }

  function handleCancelLeave() {
    setShowConfirm(false);
    setPendingAction(null);
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Email" error={errors?.email?.message} id="email">
          <Input id="email" value={user?.email || ""} disabled readOnly />
        </FormRow>

        <FormRow label="Nome" error={errors?.name?.message} id="name">
          <Input
            type="text"
            id="name"
            placeholder={user?.name || ""}
            {...register("name")}
            disabled={isUpdating}
          />
        </FormRow>

        <FormRow label="Avatar" error={errors?.avatar?.message} id="avatar">
          <FileInput
            id="avatar"
            accept="image/*"
            disabled={isUpdating}
            {...register("avatar")}
          />
        </FormRow>

        <FormRow
          label="Nova senha"
          error={errors?.password?.message}
          id="password"
        >
          <Input
            type="password"
            id="password"
            placeholder="Nova senha"
            {...register("password")}
            disabled={isUpdating}
            autoComplete="new-password"
          />
        </FormRow>

        <FormRow
          label="Confirmar nova senha"
          error={errors?.confirmPassword?.message}
          id="confirmPassword"
        >
          <Input
            type="password"
            id="confirmPassword"
            placeholder="Confirmar nova senha"
            {...register("confirmPassword")}
            disabled={isUpdating}
            autoComplete="new-password"
          />
        </FormRow>

        <FormRow
          label="Senha atual"
          error={errors?.currentPassword?.message}
          id="currentPassword"
        >
          <Input
            type="password"
            id="currentPassword"
            placeholder="Senha atual"
            {...register("currentPassword")}
            disabled={
              isUpdating ||
              !watchedFields.password ||
              !watchedFields.confirmPassword ||
              watchedFields.password !== watchedFields.confirmPassword
            }
            autoComplete="current-password"
          />
        </FormRow>

        <FormRow>
          <Button
            variation="secondary"
            type="button"
            onClick={handleCancel}
            disabled={isUpdating}
          >
            Cancelar
          </Button>
          <Button
            title={
              !hasChanges
                ? "Altere algum campo para ativar."
                : watchedFields.password &&
                    watchedFields.confirmPassword &&
                    watchedFields.password !== watchedFields.confirmPassword
                  ? "As senhas devem ser iguais."
                  : undefined
            }
            type="submit"
            disabled={
              isUpdating ||
              !hasChanges ||
              (watchedFields.password &&
                watchedFields.confirmPassword &&
                watchedFields.password !== watchedFields.confirmPassword)
            }
          >
            Atualizar conta
          </Button>
        </FormRow>
      </Form>
      <ConfirmDialog
        open={showConfirm}
        title="Confirmação"
        message="Tem certeza que deseja sair? As alterações não salvas serão perdidas."
        confirmLabel="Sim, sair"
        cancelLabel="Cancelar"
        onConfirm={handleConfirmLeave}
        onCancel={handleCancelLeave}
      />
    </>
  );
}

UpdateWorkerForm.propTypes = {
  onCloseModal: PropTypes.func,
};

export default UpdateWorkerForm;
