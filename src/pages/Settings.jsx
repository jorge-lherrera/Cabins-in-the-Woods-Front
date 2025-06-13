import { useSettings } from "../hooks/settings/useSettings";
import SettingLayout from "../features/settings/SettingLayout";
import AddSetting from "../features/settings/AddSetting";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";

function Settings() {
  const { isLoading, settings } = useSettings();

  return (
    <>
      <Row>
        <Heading as="h1">Settings</Heading>
      </Row>

      <Row>
        {isLoading ? (
          <Spinner />
        ) : settings && Object.keys(settings).length > 0 ? (
          <SettingLayout />
        ) : (
          <>
            <Empty resourceName="settings" />
            <AddSetting />
          </>
        )}
      </Row>
    </>
  );
}

export default Settings;
