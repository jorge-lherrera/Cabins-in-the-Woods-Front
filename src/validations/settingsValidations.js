import * as Yup from "yup";

const settingValidationSchema = Yup.object().shape({
  minBookingLength: Yup.number()
    .typeError("O campo duração mínima deve ser um número inteiro")
    .integer("O campo duração mínima deve ser um número inteiro")
    .min(1, "O campo duração mínima deve ser pelo menos 1")
    .required("O campo duração mínima é obrigatório"),
  maxBookingLength: Yup.number()
    .typeError("O campo duração máxima deve ser um número inteiro")
    .integer("O campo duração máxima deve ser um número inteiro")
    .min(1, "O campo duração máxima deve ser pelo menos 1")
    .moreThan(
      Yup.ref("minBookingLength"),
      "A duração máxima deve ser maior que a duração mínima.",
    )
    .required("O campo duração máxima é obrigatório"),
  maxGuestsPerBooking: Yup.number()
    .typeError(
      "O campo máximo de hóspedes por reserva deve ser um número inteiro",
    )
    .integer(
      "O campo máximo de hóspedes por reserva deve ser um número inteiro",
    )
    .min(1, "O número mínimo de hóspedes por reserva deve ser pelo menos 1.")
    .required("O campo máximo de hóspedes por reserva é obrigatório."),
  breakfastPrice: Yup.number()
    .typeError("O preço do café da manhã deve ser um número")
    .min(0, "O preço do café da manhã não pode ser negativo")
    .required("O preço do café da manhã é obrigatório."),
});

export default settingValidationSchema;
