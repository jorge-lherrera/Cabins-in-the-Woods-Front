import yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("O email fornecido não é válido.")
    .required("O email é obrigatório."),
  password: yup
    .string()
    .min(8, "O campo senha deve ter pelo menos 8 caracteres")
    .max(100, "O campo senha não pode ter mais de 100 caracteres")
    .required("O campo senha é obrigatório"),
});
