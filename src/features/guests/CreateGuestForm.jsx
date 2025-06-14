import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import { useCreateGuest } from "../../hooks/guests/useCreateGuest";
import { useEditGuest } from "../../hooks/guests/useEditGuest";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateGuestForm({ guestToEdit = {}, onCloseModal }) {
  const { isCreating, createGuest } = useCreateGuest();
  const { isEditing, editGuest } = useEditGuest();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = guestToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editGuest(
        { id: editId, newGuestData: { ...data, image } },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    } else {
      createGuest(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
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
      <FormRow label="Nome da pessoa" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "Este campo é obrigatório",
          })}
        />
      </FormRow>

      <FormRow label="Capacidade máxima" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "Este campo é obrigatório",
            min: {
              value: 1,
              message: "A capacidade deve ser pelo menos 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Preço regular" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "Este campo é obrigatório",
            min: {
              value: 1,
              message: "O preço deve ser pelo menos 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Desconto" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "Este campo é obrigatório",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "O desconto deve ser menor que o preço regular",
          })}
        />
      </FormRow>

      <FormRow label="Descrição da cabana" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", {
            required: "Este campo é obrigatório",
          })}
        />
      </FormRow>

      <FormRow label="Foto da cabana" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "Este campo é obrigatório",
          })}
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
          {isEditSession ? "Editar cabana" : "Criar nova cabana"}
        </Button>
      </FormRow>
    </Form>
  );
}

CreateGuestForm.propTypes = {
  guestToEdit: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    maxCapacity: PropTypes.number,
    regularPrice: PropTypes.number,
    discount: PropTypes.number,
    image: PropTypes.string,
    description: PropTypes.string,
  }),
  onCloseModal: PropTypes.func,
};

export default CreateGuestForm;
