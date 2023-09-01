import { Box, Text, Title, createStyles } from "@mantine/core";

import { Panel } from "../../components/Panel";

const useStyles = createStyles((theme) => ({}));

export const SettingsPanel = () => {
  const { classes, cx } = useStyles();

  return (
    <Panel title="Settings">
      <Text>This is a test</Text>
    </Panel>
  );
};
