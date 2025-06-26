import * as Yup from "yup";
import {
  positiveNumber,
  positiveInteger,
  validateStringLength,
  applyNoUnknown,
} from "./validationsUtils";
import { imageValidation } from "./imageValidation";

const image = imageValidation({ label: "image" });

const cabinsValidationSchema = applyNoUnknown(
  Yup.object().shape({
    name: validateStringLength("nome da cabana", 3, 100),
    maxCapacity: positiveInteger("capacidade máxima"),
    regularPrice: positiveNumber("preço regular").required(
      "O preço regular é obrigatório."
    ),
    discount: Yup.number()
      .typeError("O desconto deve ser um número.")
      .min(0, "O desconto não pode ser negativo.")
      .max(100, "O desconto não pode ser maior que 100%.")
      .nullable(),
    image,
    description: validateStringLength("descrição", 0, 500).nullable(),
  }),
  "Os campos adicionais não são permitidos. Por favor, verifique os campos."
);

export default cabinsValidationSchema;
