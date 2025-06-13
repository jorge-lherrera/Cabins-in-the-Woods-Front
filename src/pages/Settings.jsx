import SettingLayout from "../features/settings/SettingLayout";
import AddSetting from "../features/settings/AddSetting";

import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Settings() {
  return (
    <>
      <Row>
        <Heading as="h1">Settings</Heading>
      </Row>

      <Row>
        <SettingLayout />
        <AddSetting />
      </Row>
    </>
  );
}

export default Settings;
