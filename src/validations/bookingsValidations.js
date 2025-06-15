import * as Yup from "yup";

const bookingsValidation = Yup.object().shape({
  cabinId: Yup.number()
    .typeError("ID da cabana deve ser um número inteiro")
    .integer("ID da cabana deve ser um número inteiro")
    .min(1, "ID da cabana deve ser pelo menos 1")
    .required("ID da cabana é obrigatório"),
  guestId: Yup.number()
    .typeError("ID do hóspede deve ser um número inteiro")
    .integer("ID do hóspede deve ser um número inteiro")
    .min(1, "ID do hóspede deve ser pelo menos 1")
    .required("ID do hóspede é obrigatório"),
  startDate: Yup.date()
    .typeError("A data de início deve ser uma data válida")
    .required("A data de início é obrigatória"),
  endDate: Yup.date()
    .typeError("A data de término deve ser uma data válida")
    .min(
      Yup.ref("startDate"),
      "A data de término deve ser posterior à data de início",
    )
    .required("A data de término é obrigatória"),
  numNights: Yup.number()
    .typeError("número de noites deve ser um número inteiro")
    .integer("número de noites deve ser um número inteiro")
    .min(1, "número de noites deve ser pelo menos 1")
    .required("número de noites é obrigatório"),
  numGuests: Yup.number()
    .typeError("número de hóspedes deve ser um número inteiro")
    .integer("número de hóspedes deve ser um número inteiro")
    .min(1, "número de hóspedes deve ser pelo menos 1")
    .required("número de hóspedes é obrigatório"),
  extrasPrice: Yup.number()
    .typeError("preço dos extras deve ser um número")
    .min(0, "preço dos extras não pode ser negativo")
    .nullable(),
  hasBreakfast: Yup.boolean()
    .typeError("O campo de café da manhã deve ser verdadeiro ou falso")
    .required("O campo de café da manhã é obrigatório"),
  observations: Yup.string()
    .max(255, "observações não pode ter mais de 255 caracteres")
    .nullable(),
  isPaid: Yup.boolean()
    .typeError("O campo de pagamento deve ser verdadeiro ou falso")
    .required("O campo de pagamento é obrigatório"),
  status: Yup.string()
    .max(20, "Status não pode ter mais de 20 caracteres")
    .oneOf(
      ["unconfirmed", "checked-in", "checked-out"],
      "Status deve ser: unconfirmed, checked-in ou checked-out",
    ),
});

export default bookingsValidation;
