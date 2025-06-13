import { useState, useEffect } from "react";
import { useSettings } from "../../hooks/settings/useSettings";
import { useUpdateSetting } from "../../hooks/settings/useUpdateSetting";
import Button from "../../ui/Button";
import Empty from "../../ui/Empty";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

function SettingLayout() {
  const { isLoading, settings } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();

  const [fields, setFields] = useState(null);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (settings) {
      setFields({
        minBookingLength: settings.minBookingLength,
        maxBookingLength: settings.maxBookingLength,
        maxGuestsPerBooking: settings.maxGuestsPerBooking,
        breakfastPrice: settings.breakfastPrice,
      });
      setIsChanged(false);
    }
  }, [settings]);

  if (isLoading || fields === null) return <Spinner />;
  if (!settings || Object.keys(settings).length === 0)
    return <Empty resourceName="settings" />;
  if (isUpdating) return <Spinner />;

  function handleChange(e) {
    const { name, value } = e.target;
    const newFields = { ...fields, [name]: value };
    setFields(newFields);

    // Compara con los valores originales de settings
    const changed =
      Number(newFields.minBookingLength) !==
        Number(settings.minBookingLength) ||
      Number(newFields.maxBookingLength) !==
        Number(settings.maxBookingLength) ||
      Number(newFields.maxGuestsPerBooking) !==
        Number(settings.maxGuestsPerBooking) ||
      Number(newFields.breakfastPrice) !== Number(settings.breakfastPrice);
    setIsChanged(changed);
  }

  function handleUpdate(e) {
    e.preventDefault();
    updateSetting({
      minBookingLength: Number(fields.minBookingLength),
      maxBookingLength: Number(fields.maxBookingLength),
      maxGuestsPerBooking: Number(fields.maxGuestsPerBooking),
      breakfastPrice: Number(fields.breakfastPrice),
    });
    setIsChanged(false);
  }

  return (
    <Form onSubmit={handleUpdate}>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          name="minBookingLength"
          value={fields.minBookingLength}
          disabled={isUpdating}
          onChange={handleChange}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          name="maxBookingLength"
          value={fields.maxBookingLength}
          disabled={isUpdating}
          onChange={handleChange}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          name="maxGuestsPerBooking"
          value={fields.maxGuestsPerBooking}
          disabled={isUpdating}
          onChange={handleChange}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          name="breakfastPrice"
          value={fields.breakfastPrice}
          disabled={isUpdating}
          onChange={handleChange}
        />
      </FormRow>
      <Button disabled={!isChanged || isUpdating}>Update</Button>
    </Form>
  );
}

export default SettingLayout;
