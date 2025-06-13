import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateSetting } from "../../hooks/settings/useCreateSetting";

import settingValidationSchema from "../../validations/settingsValidations";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";

function CreateSettingForm({ onCloseModal }) {
  const { isCreating, createSetting } = useCreateSetting();

  const { register, handleSubmit, reset, formState } = useForm({
    resolver: yupResolver(settingValidationSchema),
    defaultValues: {
      minBookingLength: 1,
      maxBookingLength: 30,
      maxGuestsPerBooking: 10,
      breakfastPrice: 0,
    },
  });
  const { errors } = formState;

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
      },
    );
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
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
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancelar
        </Button>
        <Button disabled={isCreating}>Criar configuração</Button>
      </FormRow>
    </Form>
  );
}

export default CreateSettingForm;
