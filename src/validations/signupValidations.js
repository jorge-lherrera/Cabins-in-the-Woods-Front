import * as Yup from "yup";

import { validateStringLength, applyNoUnknown } from "./validationsUtils";
import { imageValidation } from "./imageValidation";

const avatar = imageValidation({ label: "avatar" });

const signupSchema = applyNoUnknown(
  Yup.object().shape({
    name: validateStringLength("nome", 3, 100),
    email: Yup.string()
      .typeError("O campo e-mail deve ser uma string.")
      .email("O e-mail fornecido não é válido.")
      .max(150, "O e-mail não pode ter mais de 150 caracteres.")
      .required("O e-mail é obrigatório."),
    password: validateStringLength("senha", 8, 100),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password")], "As senhas devem ser iguais.")
      .required("Confirme a senha."),
    avatar,
  }),
  "Os campos adicionais não são permitidos. Por favor, verifique os campos."
);

export default signupSchema;
