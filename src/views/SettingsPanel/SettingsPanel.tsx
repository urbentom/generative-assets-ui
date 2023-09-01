import { Box, Text, Title, createStyles } from "@mantine/core";
import { Panel } from "../../components/Panel";
import { useRecoilValue } from "recoil";
import { currentSettingsAtom } from "../../atoms";
import { DefaultContent } from "./DefaultContent";
import { SettingsContent } from "./SettingsContent";
import { useMemo } from "react";

const useStyles = createStyles((theme) => ({}));

export const SettingsPanel = () => {
  const { classes, cx } = useStyles();

  const currentSettings = useRecoilValue(currentSettingsAtom);

  const panelTitle = useMemo(() => {
    if (!currentSettings) return "Welcome!";
    if (currentSettings.name) return `Updating '${currentSettings.name}'`;

    return "Ops no name D:";
  }, [currentSettings]);

  return (
    <Panel title={panelTitle}>
      {currentSettings ? <SettingsContent /> : <DefaultContent />}
    </Panel>
  );
};
