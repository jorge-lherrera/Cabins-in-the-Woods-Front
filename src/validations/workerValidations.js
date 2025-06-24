import * as yup from "yup";

export const workerValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100, "O nome não pode ter mais de 100 caracteres")
    .test(
      "no-emojis",
      "O nome não pode conter emoticonos.",
      (value) => !value || !/[\u{1F600}-\u{1F6FF}]/u.test(value)
    ),
  avatar: yup
    .mixed()
    .test(
      "fileType",
      "O avatar deve ser uma imagem",
      (value) =>
        !value || (value && value.type && value.type.startsWith("image/"))
    ),
  email: yup
    .string()
    .email("O e-mail fornecido não é válido.")
    .max(150, "O e-mail não pode ter mais de 150 caracteres.")
    .required("O e-mail é obrigatório."),
  password: yup
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .max(100, "A senha não pode ter mais de 100 caracteres"),
  currentPassword: yup
    .string()
    .min(8, "A senha atual deve ter pelo menos 8 caracteres")
    .max(100, "A senha atual não pode ter mais de 100 caracteres"),
});
