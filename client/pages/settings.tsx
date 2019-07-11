import PleaseSignIn from "../components/PleaseSignIn";
import Settings from "../components/Settings/Settings";

interface Props {}

const SettingsPage: React.FunctionComponent<Props> = () => {
  return (
    <PleaseSignIn>
      <Settings />
    </PleaseSignIn>
  );
};

export default SettingsPage;
