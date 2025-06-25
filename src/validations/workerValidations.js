import * as yup from "yup";

export const workerCreateValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("O nome é obrigatório")
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
        !value ||
        typeof value === "string" ||
        (value && value.type && value.type.startsWith("image/"))
    ),
  email: yup
    .string()
    .required("O e-mail é obrigatório.")
    .email("O e-mail fornecido não é válido.")
    .max(150, "O e-mail não pode ter mais de 150 caracteres."),
  password: yup
    .string()
    .required("A senha é obrigatória")
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .max(100, "A senha não pode ter mais de 100 caracteres"),
});

export const workerUpdateValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100, "O nome não pode ter mais de 100 caracteres")
    .test(
      "no-emojis",
      "O nome não pode conter emoticonos.",
      (value) => !value || !/[\u{1F600}-\u{1F6FF}]/u.test(value)
    )
    .notRequired(),
  avatar: yup
    .mixed()
    .test(
      "fileType",
      "O avatar deve ser uma imagem",
      (value) =>
        !value ||
        typeof value === "string" ||
        (value && value.type && value.type.startsWith("image/"))
    )
    .notRequired(),
  password: yup
    .string()
    .transform((value) => (value === "" ? undefined : value))
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .max(100, "A senha não pode ter mais de 100 caracteres")
    .notRequired(),
  confirmPassword: yup
    .string()
    .transform((value) => (value === "" ? undefined : value))
    .when("password", {
      is: (val) => !!val,
      then: (schema) =>
        schema
          .required("Confirme a nova senha")
          .oneOf([yup.ref("password")], "As senhas não coincidem"),
      otherwise: (schema) => schema.notRequired(),
    }),
  currentPassword: yup
    .string()
    .transform((value) => (value === "" ? undefined : value))
    .when("password", {
      is: (val) => !!val,
      then: (schema) =>
        schema
          .required("A senha atual é obrigatória para trocar a senha")
          .min(8, "A senha atual deve ter pelo menos 8 caracteres")
          .max(100, "A senha atual não pode ter mais de 100 caracteres"),
      otherwise: (schema) => schema.notRequired(),
    }),
});
