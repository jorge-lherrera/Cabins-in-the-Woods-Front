import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useSignup } from "../../hooks/auth/useSignup";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import signupSchema from "../../validations/signupValidations";
import FileInput from "../../ui/FileInput";
import Spinner from "../../ui/Spinner";

function SignupForm({ onCloseModal, onRequestClose }) {
  const { signup, isLoading } = useSignup(onCloseModal);
  const { register, formState, handleSubmit } = useForm({
    resolver: yupResolver(signupSchema),
    mode: "onChange",
  });
  const { errors } = formState;

  function onSubmit({ name, email, password, avatar }) {
    let avatarFile = undefined;
    if (avatar && avatar.length > 0) avatarFile = avatar[0];
    signup({ name, email, password, avatar: avatarFile });
  }

  function handleCancel() {
    if (onRequestClose) onRequestClose();
  }

  if (isLoading) return <Spinner />;

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

SignupForm.propTypes = {
  onCloseModal: PropTypes.func,
  onRequestClose: PropTypes.func,
};

export default SignupForm;
