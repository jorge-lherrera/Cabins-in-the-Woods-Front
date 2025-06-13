import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateSettingForm from "./CreateSettingsForm";

function AddSetting() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="setting-form">
          <Button>Add new setting</Button>
        </Modal.Open>
        <Modal.Window name="setting-form">
          <CreateSettingForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddSetting;
