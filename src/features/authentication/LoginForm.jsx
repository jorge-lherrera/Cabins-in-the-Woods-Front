import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";
import loginSchema from "../../validations/loginValidations";
import { login } from "../../services/apiAuth";

function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/dashboard");
    },
    onSettled: () => reset(),
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="Email address" error={errors.email?.message}>
        <Input
          type="email"
          id="email"
          autoComplete="username"
          disabled={mutation.isLoading || isSubmitting}
          {...register("email")}
        />
      </FormRowVertical>

      <FormRowVertical label="Password" error={errors.password?.message}>
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
        <div className="text-red-700 text-sm mt-2">
          {mutation.error?.response?.data?.message || "Erro ao fazer login"}
        </div>
      )}
    </Form>
  );
}

export default LoginForm;
