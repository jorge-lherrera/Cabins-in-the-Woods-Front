import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSettings } from "../../hooks/settings/useSettings";
import { useUpdateSetting } from "../../hooks/settings/useUpdateSetting";
import { makeAllFieldsOptional } from "../../utils/makeAllFieldsOptional";
import settingValidationSchema from "../../validations/settingsValidations";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useEffect } from "react";

function SettingLayout() {
  const { isLoading, settings } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();

  const optionalSchema = makeAllFieldsOptional(settingValidationSchema);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },

    setError,
  } = useForm({
    resolver: yupResolver(optionalSchema),
    defaultValues: settings
      ? {
          minBookingLength: settings.minBookingLength,
          maxBookingLength: settings.maxBookingLength,
          maxGuestsPerBooking: settings.maxGuestsPerBooking,
          breakfastPrice: settings.breakfastPrice,
        }
      : {},
    mode: "onChange",
  });

  useEffect(() => {
    if (settings) {
      reset({
        minBookingLength: settings.minBookingLength,
        maxBookingLength: settings.maxBookingLength,
        maxGuestsPerBooking: settings.maxGuestsPerBooking,
        breakfastPrice: settings.breakfastPrice,
      });
    }
  }, [settings, reset]);

  if (isLoading) return <Spinner />;
  if (isUpdating) return <Spinner />;

  const hasChanges = Object.keys(dirtyFields).length > 0;

  function onSubmit(data) {
    const dataToSend = {};
    Object.keys(dirtyFields).forEach((key) => {
      dataToSend[key] = Number(data[key]);
    });

    updateSetting(dataToSend, {
      setError,
      onSuccess: () => {
        reset(data);
      },
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Noites mínimas por reserva"
        error={errors?.minBookingLength?.message}
      >
        <Input
          type="number"
          id="minBookingLength"
          {...register("minBookingLength")}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow
        label="Noites máximas por reserva"
        error={errors?.maxBookingLength?.message}
      >
        <Input
          type="number"
          id="maxBookingLength"
          {...register("maxBookingLength")}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow
        label="Máximo de hóspedes por reserva"
        error={errors?.maxGuestsPerBooking?.message}
      >
        <Input
          type="number"
          id="maxGuestsPerBooking"
          {...register("maxGuestsPerBooking")}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow
        label="Preço do café da manhã"
        error={errors?.breakfastPrice?.message}
      >
        <Input
          type="number"
          id="breakfastPrice"
          {...register("breakfastPrice")}
          disabled={isUpdating}
        />
      </FormRow>
      <div style={{ paddingTop: "1.2rem" }}>
        <Button
          disabled={!hasChanges || isUpdating}
          title={!hasChanges ? "Altere algum campo para ativar." : undefined}
        >
          Atualizar
        </Button>
      </div>
    </Form>
  );
}

export default SettingLayout;
