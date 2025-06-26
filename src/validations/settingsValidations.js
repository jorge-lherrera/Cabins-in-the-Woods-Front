import {
  positiveNumber,
  positiveInteger,
  applyNoUnknown,
} from "./validationsUtils";

const settingValidationSchema = applyNoUnknown(
  {
    minBookingLength: positiveInteger("duração mínima"),
    maxBookingLength: positiveInteger("duração máxima").test(
      "is-greater-than-min",
      "A duração máxima deve ser maior que a duração mínima.",
      function (value) {
        if (value === undefined || this.parent.minBookingLength === undefined)
          return true;
        return value > this.parent.minBookingLength;
      }
    ),
    maxGuestsPerBooking: positiveInteger("máximo de hóspedes por reserva")
      .required("O campo máximo de hóspedes por reserva é obrigatório.")
      .min(1, "O número mínimo de hóspedes por reserva deve ser pelo menos 1."),
    breakfastPrice: positiveNumber("preço do café da manhã").required(
      "O preço do café da manhã é obrigatório."
    ),
  },
  "Os campos adicionais não são permitidos. Por favor, verifique os campos."
);

export default settingValidationSchema;
