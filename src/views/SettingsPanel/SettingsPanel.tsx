import { Box, Text, Title, createStyles } from "@mantine/core";
import { Panel } from "../../components/Panel";
import { useRecoilValue } from "recoil";
import { currentSettingsAtom } from "../../atoms";
import { DefaultContent } from "./DefaultContent";
import { SettingsContent } from "./SettingsContent";

const useStyles = createStyles((theme) => ({}));

export const SettingsPanel = () => {
  const { classes, cx } = useStyles();

  const currentSettings = useRecoilValue(currentSettingsAtom);

  return (
    <Panel title={currentSettings ? "Settings" : "Welcome!"}>
      {currentSettings ? <SettingsContent /> : <DefaultContent />}
    </Panel>
  );
};
