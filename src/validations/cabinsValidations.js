import * as Yup from "yup";

const noEmojis = (value) => {
  return !/[\u{1F600}-\u{1F6FF}]/u.test(value);
};

const validateStringLength = (fieldName, min, max) =>
  Yup.string()
    .typeError(`O campo ${fieldName} deve ser uma string`)
    .min(min, `O campo ${fieldName} deve ter pelo menos ${min} caracteres`)
    .max(max, `O campo ${fieldName} não pode ter mais de ${max} caracteres`)
    .required(`O campo ${fieldName} é obrigatório`)
    .test(
      "no-emojis",
      `O campo ${fieldName} não pode conter emoticonos.`,
      (value) => (value ? noEmojis(value) : true),
    );

const cabinsValidationSchema = Yup.object().shape({
  name: validateStringLength("nome da cabana", 3, 100),
  maxCapacity: Yup.number()
    .typeError("O campo capacidade máxima deve ser um número inteiro")
    .integer("O campo capacidade máxima deve ser um número inteiro")
    .min(1, "O campo capacidade máxima deve ser pelo menos 1")
    .required("O campo capacidade máxima é obrigatório"),
  regularPrice: Yup.number()
    .typeError("O preço regular deve ser um número")
    .min(1, "O preço regular deve ser pelo menos 1")
    .required("O preço regular é obrigatório"),
  discount: Yup.number()
    .typeError("O desconto deve ser um número.")
    .min(0, "O desconto não pode ser negativo.")
    .max(100, "O desconto não pode ser maior que 100%.")
    .nullable(),
  image: Yup.mixed()
    .test(
      "is-image-or-empty",
      "Somente arquivos de imagem são permitidos.",
      (value) => {
        if (!value || value.length === 0) return true;

        if (value instanceof FileList) {
          if (value.length > 1) return false;
          return value[0]?.type.startsWith("image/");
        }

        if (value instanceof File) {
          return value.type.startsWith("image/");
        }
        return true;
      },
    )
    .test(
      "only-one-file",
      "Você só pode enviar um arquivo de imagem.",
      (value) => {
        if (!value || value.length === 0) return true;
        if (value instanceof FileList) return value.length === 1;
        return true;
      },
    ),
  description: Yup.string()
    .max(500, "A descrição não pode ter mais de 500 caracteres")
    .nullable(),
});

export default cabinsValidationSchema;
