import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateGuest } from "../../hooks/guests/useCreateGuest";
import { useEditGuest } from "../../hooks/guests/useEditGuest";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import guestsValidation from "../../validations/guestsValidations";
import { getNames } from "country-list";

function CreateGuestForm({ guestToEdit = {}, onCloseModal }) {
  const { isCreating, createGuest } = useCreateGuest();
  const { isEditing, editGuest } = useEditGuest();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = guestToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
    resolver: yupResolver(guestsValidation),
  });
  const { errors } = formState;

  const countries = getNames();

  function onSubmit(data) {
    if (isEditSession) {
      editGuest(
        { id: editId, newGuestData: data },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    } else {
      createGuest(data, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    }
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Nome completo" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isWorking}
          {...register("fullName")}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isWorking}
          {...register("email")}
        />
      </FormRow>

      <FormRow label="Nacionalidade" error={errors?.nationality?.message}>
        <select
          id="nationality"
          disabled={isWorking}
          {...register("nationality")}
        >
          <option value="">Selecione...</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </FormRow>

      <FormRow
        label="Número de identificação"
        error={errors?.nationalIdNumber?.message}
      >
        <Input
          type="text"
          id="nationalIdNumber"
          disabled={isWorking}
          {...register("nationalIdNumber")}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancelar
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Editar hóspede" : "Criar novo hóspede"}
        </Button>
      </FormRow>
    </Form>
  );
}

CreateGuestForm.propTypes = {
  guestToEdit: PropTypes.shape({
    id: PropTypes.number,
    fullName: PropTypes.string,
    email: PropTypes.string,
    nationality: PropTypes.string,
    nationalIdNumber: PropTypes.string,
  }),
  onCloseModal: PropTypes.func,
};

export default CreateGuestForm;
