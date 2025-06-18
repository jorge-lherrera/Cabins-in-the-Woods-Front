import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useCreateCabin } from "../../hooks/cabins/useCreateCabin";
import { useEditCabin } from "../../hooks/cabins/useEditCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import cabinsValidationSchema from "../../validations/cabinsValidations";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = cabinToEdit;
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
    resolver: yupResolver(cabinsValidationSchema),
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

    if (isEditSession) {
      editCabin(
        {
          id: editId,
          newCabinData: {
            ...data,
            maxCapacity: data.maxCapacity
              ? Number(data.maxCapacity)
              : undefined,
            regularPrice: data.regularPrice
              ? Number(data.regularPrice)
              : undefined,
            discount: data.discount ? Number(data.discount) : 0,
            description: data.description || "",
            file: image,
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
      createCabin(payload, {
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

CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    maxCapacity: PropTypes.number,
    regularPrice: PropTypes.number,
    discount: PropTypes.number,

    description: PropTypes.string,
  }),
  onCloseModal: PropTypes.func,
};

export default CreateCabinForm;
