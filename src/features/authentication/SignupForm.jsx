import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSignup } from "../../hooks/auth/useSignup";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import signupSchema from "../../validations/signupValidations";
import FileInput from "../../ui/FileInput";
import Modal from "../../ui/Modal";

function SignupForm({ onCloseModal }) {
  const { signup, isLoading } = useSignup();
  const { register, formState, handleSubmit, reset } = useForm({
    resolver: yupResolver(signupSchema),
  });
  const { errors } = formState;

  function onSubmit({ name, email, password, avatar }) {
    let avatarFile = undefined;
    if (avatar && avatar.length > 0) avatarFile = avatar[0];
    signup(
      { name, email, password, avatar: avatarFile },
      {
        onSettled: () => {
          reset();
          if (onCloseModal) onCloseModal();
        },
      }
    );
  }

  function handleCancel() {
    reset();
    if (onCloseModal) onCloseModal();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Nome completo" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...register("name")}
        />
      </FormRow>

      <FormRow label="E-mail" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email")}
        />
      </FormRow>

      <FormRow
        label="Senha (mínimo 8 caracteres)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password")}
        />
      </FormRow>

      <FormRow label="Repetir senha" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm")}
        />
      </FormRow>

      <FormRow label="Avatar (opcional)" error={errors?.avatar?.message}>
        <FileInput
          id="avatar"
          accept="image/*"
          disabled={isLoading}
          {...register("avatar")}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="button"
          onClick={handleCancel}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button disabled={isLoading}>Criar conta</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
