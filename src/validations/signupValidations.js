import * as Yup from "yup";

const noEmojis = (value) => !/[\u{1F600}-\u{1F6FF}]/u.test(value);

const signupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "O nome deve ter pelo menos 3 caracteres.")
    .max(100, "O nome não pode ter mais de 100 caracteres.")
    .required("O nome é obrigatório.")
    .test("no-emojis", "O nome não pode conter emoticonos.", noEmojis),
  email: Yup.string()
    .email("O e-mail fornecido não é válido.")
    .max(150, "O e-mail não pode ter mais de 150 caracteres.")
    .required("O e-mail é obrigatório.")
    .test("no-emojis", "O e-mail não pode conter emoticonos.", noEmojis),
  password: Yup.string()
    .min(8, "A senha deve ter pelo menos 8 caracteres.")
    .max(100, "A senha não pode ter mais de 100 caracteres.")
    .required("A senha é obrigatória.")
    .test("no-emojis", "A senha não pode conter emoticonos.", noEmojis),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password")], "As senhas devem ser iguais.")
    .required("Confirme a senha."),
  avatar: Yup.mixed()
    .test("fileType", "O avatar deve ser uma imagem válida.", (value) => {
      // Solo valida si hay archivo seleccionado
      if (!value || value.length === 0) return true;
      return value[0] && value[0].type.startsWith("image/");
    })
    .nullable(),
});

export default signupSchema;
