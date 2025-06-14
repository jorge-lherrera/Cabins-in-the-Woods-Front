import * as Yup from "yup";

// No emojis (puedes implementar o importar si tienes la función)
const noEmojis = (value) => {
  // Simple regex for emoji detection (puedes mejorar según tu utilitario backend)
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

const guestsValidation = Yup.object().shape({
  fullName: validateStringLength("nome completo", 3, 100),
  email: Yup.string()
    .email("O e-mail fornecido não é válido.")
    .max(150, "O e-mail não pode ter mais de 150 caracteres.")
    .required("O e-mail é obrigatório."),
  nationality: validateStringLength("nacionalidade", 2, 50),
  countryFlag: Yup.string()
    .url("A URL da bandeira do país não é válida.")
    .nullable(),
  nationalIdNumber: validateStringLength("número de identificação", 5, 20),
});

export default guestsValidation;
