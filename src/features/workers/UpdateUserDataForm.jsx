import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import { useSession } from "../../hooks/auth/useSession";
import { useUpdateWorker } from "../../hooks/workers/useUpdateWorker";
import { makeAllFieldsOptional } from "../../utils/makeAllFieldsOptional";

import workerValidation from "../../validations/workerValidations";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

function UpdateUserDataForm() {
  const { data: session } = useSession();
  const user = session?.user || session;
  const { updateWorker, isUpdating } = useUpdateWorker();
  const navigate = useNavigate();

  const [avatarPreview, setAvatarPreview] = useState(null);

  const workerUpdateValidationSchema = makeAllFieldsOptional(workerValidation);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, dirtyFields },
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

  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (file && file.type && file.type.startsWith("image/")) {
      setAvatarPreview(URL.createObjectURL(file));
      setValue("avatar", e.target.files, { shouldDirty: true });
    } else {
      setAvatarPreview(null);
      setValue("avatar", null, { shouldDirty: true });
    }
  }

  const hasChanges =
    !!dirtyFields.name ||
    !!dirtyFields.avatar ||
    (!!dirtyFields.password &&
      !!dirtyFields.currentPassword &&
      !!dirtyFields.confirmPassword);

  function onSubmit(formData) {
    const dataToSend = {};
    if (dirtyFields.name) dataToSend.name = formData.name;
    if (dirtyFields.avatar && formData.avatar && formData.avatar[0])
      dataToSend.avatar = formData.avatar[0];
    if (
      formData.password &&
      formData.currentPassword &&
      formData.confirmPassword
    ) {
      dataToSend.password = formData.password;
      dataToSend.currentPassword = formData.currentPassword;
    }

    updateWorker(dataToSend, {
      onSuccess: () => {
        reset(
          {
            name: undefined,
            avatar: null,
            password: undefined,
            confirmPassword: undefined,
            currentPassword: undefined,
          },
          { keepDirty: false }
        );
        setAvatarPreview(null);
        navigate("/dashboard", { replace: true });
      },
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Email" id="email">
        <Input id="email" value={user?.email || ""} disabled readOnly />
      </FormRow>

      <FormRow label="Nome" id="name">
        <Input
          type="text"
          id="name"
          placeholder={user?.name || ""}
          {...register("name")}
          disabled={isUpdating}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </FormRow>

      <FormRow label="Avatar" id="avatar">
        <FileInput
          id="avatar"
          accept="image/*"
          {...register("avatar")}
          onChange={handleAvatarChange}
          disabled={isUpdating}
        />
        {avatarPreview && (
          <img
            src={avatarPreview}
            alt="Avatar preview"
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              marginTop: 8,
              objectFit: "cover",
            }}
          />
        )}
        {errors.avatar && <span>{errors.avatar.message}</span>}
      </FormRow>

      <FormRow label="Nova senha" id="password">
        <Input
          type="password"
          id="password"
          placeholder="Nova senha"
          {...register("password")}
          disabled={isUpdating}
          autoComplete="new-password"
        />
      </FormRow>

      <FormRow label="Confirmar nova senha" id="confirmPassword">
        <Input
          type="password"
          id="confirmPassword"
          placeholder="Confirmar nova senha"
          {...register("confirmPassword")}
          disabled={isUpdating}
          autoComplete="new-password"
        />
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}
      </FormRow>

      <FormRow label="Senha atual" id="currentPassword">
        <Input
          type="password"
          id="currentPassword"
          placeholder="Senha atual"
          {...register("currentPassword")}
          disabled={isUpdating}
          autoComplete="current-password"
        />
        {errors.currentPassword && (
          <span>{errors.currentPassword.message}</span>
        )}
      </FormRow>

      <FormRow>
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
  );
}

export default UpdateUserDataForm;
