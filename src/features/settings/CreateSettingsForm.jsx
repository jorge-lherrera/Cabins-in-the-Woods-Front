import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useCreateSetting } from "../../hooks/settings/useCreateSetting";

import settingValidationSchema from "../../validations/settingsValidations";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";

function CreateSettingForm({ onCloseModal, onRequestClose }) {
  const { isCreating, createSetting } = useCreateSetting(onCloseModal);

  const { register, handleSubmit, reset, formState } = useForm({
    resolver: yupResolver(settingValidationSchema),
    mode: "onChange",
  });
  const { errors } = formState;

  function handleCancel() {
    if (onRequestClose) onRequestClose();
  }

  function onSubmit(data) {
    createSetting(
      {
        minBookingLength: Number(data.minBookingLength),
        maxBookingLength: Number(data.maxBookingLength),
        maxGuestsPerBooking: Number(data.maxGuestsPerBooking),
        breakfastPrice: Number(data.breakfastPrice),
      },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow
        label="Noites mínimas por reserva"
        error={errors?.minBookingLength?.message}
      >
        <Input
          type="number"
          id="minBookingLength"
          disabled={isCreating}
          {...register("minBookingLength")}
        />
      </FormRow>

      <FormRow
        label="Noites máximas por reserva"
        error={errors?.maxBookingLength?.message}
      >
        <Input
          type="number"
          id="maxBookingLength"
          disabled={isCreating}
          {...register("maxBookingLength")}
        />
      </FormRow>

      <FormRow
        label="Máximo de hóspedes por reserva"
        error={errors?.maxGuestsPerBooking?.message}
      >
        <Input
          type="number"
          id="maxGuestsPerBooking"
          disabled={isCreating}
          {...register("maxGuestsPerBooking")}
        />
      </FormRow>

      <FormRow
        label="Preço do café da manhã"
        error={errors?.breakfastPrice?.message}
      >
        <Input
          type="number"
          id="breakfastPrice"
          disabled={isCreating}
          {...register("breakfastPrice")}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="button"
          onClick={handleCancel}
          disabled={isCreating}
        >
          Cancelar
        </Button>
        <Button disabled={isCreating}>Criar nova configuração</Button>
      </FormRow>
    </Form>
  );
}

CreateSettingForm.propTypes = {
  onCloseModal: PropTypes.func,
  onRequestClose: PropTypes.func,
};

export default CreateSettingForm;
