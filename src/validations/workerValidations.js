import * as Yup from "yup";

import { validateStringLength, applyNoUnknown } from "./validationsUtils";
import { imageValidation } from "./imageValidation";

const avatar = imageValidation({ label: "avatar" });

const workerValidation = applyNoUnknown(
  Yup.object().shape({
    name: validateStringLength("nome", 3, 100),
    email: Yup.string()
      .typeError("O campo e-mail deve ser uma string.")
      .email("O e-mail fornecido não é válido.")
      .max(150, "O e-mail não pode ter mais de 150 caracteres.")
      .required("O e-mail é obrigatório."),
    avatar,
    password: validateStringLength("senha", 8, 100),
    currentPassword: Yup.string()
      .typeError("O campo senha atual deve ser uma string.")
      .min(8, "A senha atual deve ter pelo menos 8 caracteres.")
      .max(100, "A senha atual não pode ter mais de 100 caracteres."),
  }),
  "Os campos adicionais não são permitidos. Por favor, verifique os campos."
);

export default workerValidation;
