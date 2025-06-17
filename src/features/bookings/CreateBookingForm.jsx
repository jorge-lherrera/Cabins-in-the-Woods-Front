import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { format, parseISO } from "date-fns";

import { useCreateBooking } from "../../hooks/bookings/useCreateBooking";
import { useCabins } from "../../hooks/cabins/useCabins";
import { useGuests } from "../../hooks/guests/useGuests";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import bookingsValidationSchema from "../../validations/bookingsValidations";

function CreateBookingForm({ onCloseModal }) {
  const { isCreating, createBooking } = useCreateBooking();
  const { cabins, isLoading: isLoadingCabins } = useCabins();
  const { guests, isLoading: isLoadingGuests } = useGuests();

  const {
    register,
    handleSubmit,
    reset,
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
  });

  function onSubmit(data) {
    // Formatea fechas a yyyy-MM-dd
    const payload = {
      ...data,
      cabinId: Number(data.cabinId),
      guestId: Number(data.guestId),
      numGuests: Number(data.numGuests),
      extrasPrice: Number(data.extrasPrice),
      startDate: data.startDate
        ? format(parseISO(data.startDate), "yyyy-MM-dd")
        : "",
      endDate: data.endDate ? format(parseISO(data.endDate), "yyyy-MM-dd") : "",
    };
    createBooking(payload, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabina" error={errors.cabinId?.message}>
        <select {...register("cabinId")} disabled={isLoadingCabins} required>
          <option value="">Selecciona una cabina</option>
          {cabins.map((cabin) => (
            <option key={cabin.id} value={cabin.id}>
              {cabin.name}
            </option>
          ))}
        </select>
      </FormRow>

      <FormRow label="Huésped" error={errors.guestId?.message}>
        <select {...register("guestId")} disabled={isLoadingGuests} required>
          <option value="">Selecciona un huésped</option>
          {guests.map((guest) => (
            <option key={guest.id} value={guest.id}>
              {guest.fullName}
            </option>
          ))}
        </select>
      </FormRow>

      <FormRow label="Fecha de inicio" error={errors.startDate?.message}>
        <Input type="date" {...register("startDate")} required />
      </FormRow>

      <FormRow label="Fecha de fin" error={errors.endDate?.message}>
        <Input type="date" {...register("endDate")} required />
      </FormRow>

      <FormRow label="Número de huéspedes" error={errors.numGuests?.message}>
        <Input type="number" min={1} {...register("numGuests")} required />
      </FormRow>

      <FormRow label="Precio extras" error={errors.extrasPrice?.message}>
        <Input type="number" min={0} {...register("extrasPrice")} />
      </FormRow>

      <FormRow label="¿Incluye desayuno?" error={errors.hasBreakfast?.message}>
        <input type="checkbox" {...register("hasBreakfast")} />
      </FormRow>

      <FormRow label="Observaciones" error={errors.observations?.message}>
        <Textarea {...register("observations")} maxLength={255} />
      </FormRow>

      <FormRow label="¿Pagado?" error={errors.isPaid?.message}>
        <input type="checkbox" {...register("isPaid")} />
      </FormRow>

      <FormRow label="Estado" error={errors.status?.message}>
        <select {...register("status")} required>
          <option value="unconfirmed">Sin confirmar</option>
          <option value="checked-in">Checked-in</option>
          <option value="checked-out">Checked-out</option>
        </select>
      </FormRow>

      <FormRow>
        <Button variation="primary" size="medium" disabled={isCreating}>
          Crear reserva
        </Button>
      </FormRow>
    </Form>
  );
}

CreateBookingForm.propTypes = {
  onCloseModal: PropTypes.func,
};

export default CreateBookingForm;
