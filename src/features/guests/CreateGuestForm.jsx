import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getNames } from "country-list";

import { useCreateGuest } from "../../hooks/guests/useCreateGuest";
import { useEditGuest } from "../../hooks/guests/useEditGuest";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import guestsValidation from "../../validations/guestsValidations";
import AsyncSelectStyled from "../../ui/AsyncSelectStyled";

function CreateGuestForm({ guestToEdit = {}, onCloseModal, onRequestClose }) {
  const { isCreating, createGuest } = useCreateGuest(onCloseModal);
  const { isEditing, editGuest } = useEditGuest(onCloseModal);
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = guestToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState, setValue, watch } = useForm(
    {
      defaultValues: isEditSession ? editValues : {},
      resolver: yupResolver(guestsValidation),
      mode: "onChange",
    }
  );
  const { errors } = formState;

  function onSubmit(data) {
    if (isEditSession) {
      editGuest(
        { id: editId, newGuestData: data },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
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

  function handleCancel() {
    if (onRequestClose) onRequestClose();
  }

  const loadCountryOptions = (inputValue, callback) => {
    const options = getNames()
      .filter((country) =>
        country.toLowerCase().includes(inputValue.toLowerCase())
      )
      .map((country) => ({
        value: country,
        label: country,
      }));
    callback(options);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
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
        <AsyncSelectStyled
          cacheOptions
          defaultOptions={getNames().map((country) => ({
            value: country,
            label: country,
          }))}
          loadOptions={loadCountryOptions}
          onChange={(option) =>
            setValue("nationality", option ? option.value : "")
          }
          isClearable
          placeholder="Selecione..."
          isDisabled={isWorking}
          value={
            watch("nationality")
              ? {
                  value: watch("nationality"),
                  label: watch("nationality"),
                }
              : null
          }
          instanceId="nationality-select"
        />
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
          type="button"
          onClick={handleCancel}
          disabled={isWorking}
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
  onRequestClose: PropTypes.func,
};

export default CreateGuestForm;
