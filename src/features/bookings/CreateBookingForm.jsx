import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useCreateBooking } from "../../hooks/bookings/useCreateBooking";
import { useEditBooking } from "../../hooks/bookings/useEditBooking";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import bookingsValidationSchema from "../../validations/bookingsValidations";

function CreateBookingForm({ bookingToEdit = {}, onCloseModal }) {
  const { isCreating, createBooking } = useCreateBooking();
  const { isEditing, editBooking } = useEditBooking();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = bookingToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession
      ? {
          ...editValues,
          maxCapacity: Number(editValues.maxCapacity),
          regularPrice: Number(editValues.regularPrice),
          discount: Number(editValues.discount),
        }
      : {},
    resolver: yupResolver(bookingsValidationSchema),
  });
  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    const payload = {
      name: data.name,
      maxCapacity: data.maxCapacity ? Number(data.maxCapacity) : undefined,
      regularPrice: data.regularPrice ? Number(data.regularPrice) : undefined,
      discount: data.discount ? Number(data.discount) : 0,
      description: data.description || "",
      file: image,
    };

    console.log("Payload to create/edit cabin:", payload);

    if (isEditSession) {
      editBooking(
        {
          id: editId,
          newBookingData: {
            ...data,
            maxCapacity: data.maxCapacity
              ? Number(data.maxCapacity)
              : undefined,
            regularPrice: data.regularPrice
              ? Number(data.regularPrice)
              : undefined,
            discount: data.discount ? Number(data.discount) : 0,
            description: data.description || "",
          },
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    } else {
      createBooking(payload, {
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
      <FormRow label="Nome da cabana" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name")}
        />
      </FormRow>

      <FormRow label="Capacidade máxima" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity")}
        />
      </FormRow>

      <FormRow label="Preço regular" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice")}
        />
      </FormRow>

      <FormRow label="Desconto" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount")}
        />
      </FormRow>

      <FormRow label="Descrição da cabana" error={errors?.description?.message}>
        <Textarea
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description")}
        />
      </FormRow>

      <FormRow label="Foto da cabana" error={errors?.image?.message}>
        <FileInput id="image" accept="image/*" {...register("image")} />
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
          {isEditSession ? "Editar cabana" : "Criar nova cabana"}
        </Button>
      </FormRow>
    </Form>
  );
}

CreateBookingForm.propTypes = {
  bookingToEdit: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    maxCapacity: PropTypes.number,
    regularPrice: PropTypes.number,
    discount: PropTypes.number,

    description: PropTypes.string,
  }),
  onCloseModal: PropTypes.func,
};

export default CreateBookingForm;
