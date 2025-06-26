import * as yup from "yup";

export function makeAllFieldsOptional(schema) {
  const fields = schema.fields;
  const shape = {};
  for (const key in fields) {
    shape[key] = fields[key].clone().notRequired();
  }
  return yup.object().shape(shape);
}
