import PropTypes from "prop-types";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useCreateBooking } from "../../hooks/bookings/useCreateBooking";
import { useGuestSearch } from "../../hooks/guests/useGuestSearch";
import { useCabinSearch } from "../../hooks/cabins/useCabinSearch";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import bookingsValidationSchema from "../../validations/bookingsValidations";
import SpinnerMini from "../../ui/SpinnerMini";
import AsyncSelectStyled from "../../ui/AsyncSelectStyled";

const StyledCheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  font-size: 1.5rem;
  user-select: none;
`;

const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  width: 2rem;
  height: 2rem;
  border: 2px solid var(--color-grey-400);
  border-radius: 0.4rem;
  background: var(--color-grey-0);
  display: inline-block;
  position: relative;
  transition:
    border 0.2s,
    box-shadow 0.2s;

  &:checked {
    background: var(--color-brand-600);
    border-color: var(--color-brand-600);
  }

  &:checked::after {
    content: "";
    position: absolute;
    left: 0.5rem;
    top: 0.2rem;
    width: 0.5rem;
    height: 1rem;
    border: solid #fff;
    border-width: 0 0.3rem 0.3rem 0;
    transform: rotate(45deg);
    display: block;
  }

  &:focus {
    outline: 2px solid var(--color-brand-600);
    box-shadow: 0 0 0 2px var(--color-brand-200);
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 0.8rem 1.2rem;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
  font-size: 1.6rem;
  transition:
    border 0.2s,
    background-color 0.3s,
    color 0.3s;
  max-height: 16rem;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--color-grey-400) var(--color-grey-100);

  &::-webkit-scrollbar {
    width: 8px;
    background: var(--color-grey-100);
  }
  &::-webkit-scrollbar-thumb {
    background: var(--color-grey-400);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-button {
    display: none;
    height: 0;
    width: 0;
  }

  &:focus {
    outline: 2px solid var(--color-brand-600);
    border-color: var(--color-brand-600);
  }
  &:disabled {
    background-color: var(--color-grey-200);
    color: var(--color-grey-500);
  }

  option {
    background-color: var(--color-grey-0);
    color: var(--color-grey-700);
  }
`;

function CreateBookingForm({ onCloseModal, onRequestClose }) {
  const { isCreating, createBooking } = useCreateBooking();

  const {
    loadGuestOptions,
    isLoading: isLoadingGuests,
    error: errorGuests,
  } = useGuestSearch();
  const {
    loadCabinOptions,
    isLoading: isLoadingCabins,
    error: errorCabins,
  } = useCabinSearch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookingsValidationSchema),
    defaultValues: {
      cabinId: "",
      guestId: "",
      startDate: "",
      endDate: "",
      numGuests: 1,
      extrasPrice: 0,
      hasBreakfast: false,
      observations: "",
      isPaid: false,
      status: "unconfirmed",
    },
    mode: "onChange",
  });

  function toUtcISOString(dateStr, offsetHours = -3) {
    const date = new Date(dateStr + "T00:00:00");
    const utcDate = new Date(date.getTime() - offsetHours * 60 * 60 * 1000);
    return utcDate.toISOString();
  }

  function onSubmit(data) {
    const payload = {
      ...data,
      cabinId: Number(data.cabinId),
      guestId: Number(data.guestId),
      numGuests: Number(data.numGuests),
      extrasPrice: Number(data.extrasPrice),
      startDate: data.startDate ? toUtcISOString(data.startDate) : "",
      endDate: data.endDate ? toUtcISOString(data.endDate) : "",
    };

    createBooking(payload, {
      onSuccess: () => {
        reset();
        if (onCloseModal) onCloseModal();
      },
    });
  }

  function handleCancel() {
    if (onRequestClose) onRequestClose();
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabana" error={errors.cabinId?.message}>
        <AsyncSelectStyled
          cacheOptions
          defaultOptions
          loadOptions={loadCabinOptions}
          onChange={(option) => setValue("cabinId", option ? option.value : "")}
          isClearable
          placeholder="Busque uma cabana..."
          isLoading={isLoadingCabins}
          noOptionsMessage={() =>
            errorCabins
              ? errorCabins.message || "Erro ao carregar as cabanas"
              : "Nenhuma cabana encontrada"
          }
          components={{
            LoadingIndicator: SpinnerMini,
          }}
          instanceId="cabin-select"
        />
      </FormRow>

      <FormRow label="Hóspede" error={errors.guestId?.message}>
        <AsyncSelectStyled
          cacheOptions
          defaultOptions
          loadOptions={loadGuestOptions}
          onChange={(option) => setValue("guestId", option ? option.value : "")}
          isClearable
          placeholder="Busque um hóspede..."
          isLoading={isLoadingGuests}
          noOptionsMessage={() =>
            errorGuests
              ? errorGuests.message || "Erro ao carregar os hóspedes"
              : "Nenhum hóspede encontrado"
          }
          components={{
            LoadingIndicator: SpinnerMini,
          }}
          instanceId="guest-select"
        />
      </FormRow>

      <FormRow label="Data de início" error={errors.startDate?.message}>
        <Input type="date" {...register("startDate")} required />
      </FormRow>

      <FormRow label="Data de término" error={errors.endDate?.message}>
        <Input type="date" {...register("endDate")} required />
      </FormRow>

      <FormRow label="Número de hóspedes" error={errors.numGuests?.message}>
        <Input type="number" min={1} {...register("numGuests")} required />
      </FormRow>

      <FormRow label="Preço dos extras" error={errors.extrasPrice?.message}>
        <Input type="number" min={0} {...register("extrasPrice")} />
      </FormRow>

      <FormRow
        label="Café da manhã incluso?"
        error={errors.hasBreakfast?.message}
      >
        <StyledCheckboxLabel>
          <StyledCheckbox {...register("hasBreakfast")} />
          Café da manhã incluso
        </StyledCheckboxLabel>
      </FormRow>

      <FormRow label="Observações" error={errors.observations?.message}>
        <Textarea {...register("observations")} maxLength={255} />
      </FormRow>

      <FormRow label="Pago?" error={errors.isPaid?.message}>
        <StyledCheckboxLabel>
          <StyledCheckbox {...register("isPaid")} />
          Pago
        </StyledCheckboxLabel>
      </FormRow>

      <FormRow label="Status" error={errors.status?.message}>
        <StyledSelect {...register("status")} required>
          <option value="unconfirmed">Não confirmado</option>
          <option value="checked-in">Check-in realizado</option>
          <option value="checked-out">Check-out realizado</option>
        </StyledSelect>
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
        <Button variation="primary" size="medium" disabled={isCreating}>
          Criar reserva
        </Button>
      </FormRow>
    </Form>
  );
}

CreateBookingForm.propTypes = {
  onCloseModal: PropTypes.func,
  onRequestClose: PropTypes.func,
};

export default CreateBookingForm;
