import * as Yup from "yup";

export function imageValidation({
  required = false,
  maxFiles = 1,
  allowedTypes = ["image/"],
  label = "imagem",
} = {}) {
  return Yup.mixed()
    .test("fileType", `O campo ${label} deve ser uma imagem.`, (value) => {
      if (!value || value.length === 0) return !required;
      if (typeof value === "string") return true;
      if (value instanceof File) {
        return allowedTypes.some((type) => value.type.startsWith(type));
      }
      if (value instanceof FileList || Array.isArray(value)) {
        if (value.length > maxFiles) return false;
        return Array.from(value).every((file) =>
          allowedTypes.some((type) => file.type.startsWith(type))
        );
      }
      return false;
    })
    .test(
      "maxFiles",
      `Você só pode enviar até ${maxFiles} arquivo(s) de imagem.`,
      (value) => {
        if (!value || value.length === 0) return true;
        if (value instanceof FileList || Array.isArray(value))
          return value.length <= maxFiles;
        return true;
      }
    )
    .nullable();
}
