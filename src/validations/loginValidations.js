import * as Yup from "yup";
import { validateStringLength, applyNoUnknown } from "./validationsUtils";

const loginValidation = applyNoUnknown(
  Yup.object().shape({
    email: Yup.string()
      .email("O email fornecido não é válido.")
      .required("O email é obrigatório."),
    password: validateStringLength("senha", 8, 100),
  }),
  "Os campos adicionais não são permitidos. Campos obrigatórios: email, password."
);

export default loginValidation;
