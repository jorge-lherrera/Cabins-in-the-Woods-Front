import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { workerUpdateValidationSchema } from "../../validations/workerValidations";
import { useSession } from "../../hooks/auth/useSession";
import { useUpdateWorker } from "../../hooks/workers/useUpdateWorker";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

function UpdateUserDataForm() {
  const { data: session } = useSession();
  const { updateWorker, isUpdating } = useUpdateWorker();

  const [avatarPreview, setAvatarPreview] = useState(session?.avatar || "");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: yupResolver(workerUpdateValidationSchema),
    defaultValues: {
      name: session?.name || "",
      email: session?.email || "",
      avatar: null,
      password: "",
      currentPassword: "",
    },
  });

  const watchedFields = watch();

  const hasChanges =
    !!dirtyFields.name ||
    !!dirtyFields.avatar ||
    (!!watchedFields.password && !!watchedFields.currentPassword);

  function onSubmit(formData) {
    const dataToSend = {};
    if (dirtyFields.name) dataToSend.name = formData.name;
    if (dirtyFields.avatar && formData.avatar && formData.avatar[0])
      dataToSend.avatar = formData.avatar[0];
    if (formData.password && formData.currentPassword) {
      dataToSend.password = formData.password;
      dataToSend.currentPassword = formData.currentPassword;
    }

    updateWorker(dataToSend, {
      onSuccess: () => {
        reset(
          {
            name: formData.name,
            email: formData.email,
            avatar: null,
            password: "",
            currentPassword: "",
          },
          { keepDirty: false }
        );
        setAvatarPreview(
          formData.avatar && formData.avatar[0]
            ? URL.createObjectURL(formData.avatar[0])
            : session?.avatar || ""
        );
      },
    });
  }

  function handleAvatarChange(e) {
    const file = e.target.files[0];

    if (file && file.type && file.type.startsWith("image/")) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Email" id="email">
        <Input id="email" value={session?.email || ""} disabled readOnly />
      </FormRow>

      <FormRow label="Nome" id="name">
        <Input
          type="text"
          id="name"
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
            style={{ width: 48, height: 48, borderRadius: "50%", marginTop: 8 }}
          />
        )}
        {errors.avatar && <span>{errors.avatar.message}</span>}
      </FormRow>

      <FormRow label="Nova senha" id="password">
        <Input
          type="password"
          id="password"
          {...register("password")}
          disabled={isUpdating}
          autoComplete="new-password"
        />
        {errors.password && <span>{errors.password.message}</span>}
      </FormRow>

      <FormRow
        label="Senha atual (obrigatória para trocar senha)"
        id="currentPassword"
      >
        <Input
          type="password"
          id="currentPassword"
          {...register("currentPassword")}
          disabled={isUpdating}
          autoComplete="current-password"
        />
        {errors.currentPassword && (
          <span>{errors.currentPassword.message}</span>
        )}
      </FormRow>

      <FormRow>
        <Button type="submit" disabled={isUpdating || !hasChanges}>
          Atualizar conta
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
