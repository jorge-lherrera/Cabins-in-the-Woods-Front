import { useState } from "react";
import { useForm } from "react-hook-form";

import { useSession } from "../../hooks/auth/useSession";
import { useUpdateUser } from "../../hooks/useUpdateUser";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

function UpdateUserDataForm() {
  const { data: session } = useSession();

  const email = session?.email || "";
  const currentFullName = session?.name || "";

  const { updateUser, isUpdating } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  const {
    register,
    handleSubmit,
    formState,
    getValues,
    reset: resetPasswordForm,
  } = useForm();
  const { errors } = formState;

  function handleUserDataSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          setFullName(currentFullName);
          e.target.reset();
        },
      },
    );
  }

  function handleCancelUserData() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  function onPasswordSubmit({ password }) {
    updateUser({ password }, { onSuccess: resetPasswordForm });
  }

  return (
    <>
      <Form onSubmit={handleUserDataSubmit}>
        <FormRow label="Email address">
          <Input value={email} disabled />
        </FormRow>

        <FormRow label="Full name">
          <Input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            id="fullName"
            disabled={isUpdating}
          />
        </FormRow>

        <FormRow label="Avatar image">
          <FileInput
            id="avatar"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            disabled={isUpdating}
          />
        </FormRow>

        <FormRow>
          <Button
            type="reset"
            variation="secondary"
            disabled={isUpdating}
            onClick={handleCancelUserData}
          >
            Cancel
          </Button>
          <Button disabled={isUpdating}>Update account</Button>
        </FormRow>
      </Form>

      <Form onSubmit={handleSubmit(onPasswordSubmit)}>
        <FormRow
          label="New password (min 8 chars)"
          error={errors?.password?.message}
        >
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            disabled={isUpdating}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            })}
          />
        </FormRow>

        <FormRow
          label="Confirm password"
          error={errors?.passwordConfirm?.message}
        >
          <Input
            type="password"
            autoComplete="new-password"
            id="passwordConfirm"
            disabled={isUpdating}
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                getValues().password === value || "Passwords need to match",
            })}
          />
        </FormRow>
        <FormRow>
          <Button
            onClick={resetPasswordForm}
            type="reset"
            variation="secondary"
          >
            Cancel
          </Button>
          <Button disabled={isUpdating}>Update password</Button>
        </FormRow>
      </Form>
    </>
  );
}

export default UpdateUserDataForm;
