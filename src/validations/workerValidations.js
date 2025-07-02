import * as Yup from "yup";
import { applyNoUnknown } from "./validationsUtils";
import { imageValidation } from "./imageValidation";

const emptyToUndefined = (schema) =>
  schema.transform((value) => (value === "" ? undefined : value));

const avatar = imageValidation({ label: "avatar" });

const workerValidation = applyNoUnknown(
  Yup.object().shape({
    name: emptyToUndefined(
      Yup.string()
        .min(3, "O campo nome deve ter pelo menos 3 caracteres")
        .max(100, "O campo nome não pode ter mais de 100 caracteres")
    ),
    email: Yup.string()
      .typeError("O campo e-mail deve ser uma string.")
      .email("O e-mail fornecido não é válido.")
      .max(150, "O e-mail não pode ter mais de 150 caracteres.")
      .required("O e-mail é obrigatório."),
    avatar,
    password: emptyToUndefined(
      Yup.string()
        .min(8, "A senha deve ter pelo menos 8 caracteres")
        .max(100, "A senha não pode ter mais de 100 caracteres")
    ),
    confirmPassword: emptyToUndefined(
      Yup.string().oneOf(
        [Yup.ref("password"), null],
        "As senhas devem ser iguais."
      )
    ),
    currentPassword: emptyToUndefined(
      Yup.string()
        .typeError("O campo senha atual deve ser uma string.")
        .min(8, "A senha atual deve ter pelo menos 8 caracteres.")
        .max(100, "A senha atual não pode ter mais de 100 caracteres.")
    ),
  }),
  "Os campos adicionais não são permitidos. Por favor, verifique os campos."
);

export default workerValidation;
