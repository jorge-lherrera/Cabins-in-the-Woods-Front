import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useLogin } from "../../hooks/auth/useLogin";

import Modal from "../../ui/Modal";
import SignupForm from "./SignupForm";
import loginSchema from "../../validations/loginValidations";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";
import Spinner from "../../ui/Spinner";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const mutation = useLogin();
  const isLoading = mutation.isLoading || isSubmitting;

  if (isLoading) return <Spinner />;

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Modal>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRowVertical label="Email" error={errors.email?.message}>
          <Input
            type="email"
            id="email"
            autoComplete="username"
            disabled={mutation.isLoading || isSubmitting}
            {...register("email")}
          />
        </FormRowVertical>

        <FormRowVertical label="Senha" error={errors.password?.message}>
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            disabled={mutation.isLoading || isSubmitting}
            {...register("password")}
          />
        </FormRowVertical>

        <FormRowVertical>
          <Button size="large" disabled={mutation.isLoading || isSubmitting}>
            {!mutation.isLoading ? "Log in" : <SpinnerMini />}
          </Button>
        </FormRowVertical>
        {mutation.isError && (
          <div className="mt-2 text-sm text-red-700">
            {mutation.error?.response?.data?.message || "Erro ao fazer login"}
          </div>
        )}
        <div style={{ marginTop: "1.5rem", textAlign: "right" }}>
          <span style={{ fontSize: "1.4rem" }}>
            Ainda não tem cadastro?{" "}
            <Modal.Open opens="signup-form">
              <span
                style={{
                  color: "#2563eb",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Cadastre-se
              </span>
            </Modal.Open>
          </span>
        </div>
      </Form>
      <Modal.Window name="signup-form">
        <SignupForm />
      </Modal.Window>
    </Modal>
  );
}

export default LoginForm;
