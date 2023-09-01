import { Stack, createStyles } from "@mantine/core";
import { Directory } from "../../components/Directory";
import { useState } from "react";
import { Panel } from "../../components/Panel";
import { FileDrop } from "../../components/FileDrop";

const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.dark[5],
    borderRadius: theme.radius.md,
  },
  panelTitle: {
    marginBottom: theme.spacing.md,
  },
}));

export const AssetsPanel = () => {
  const { classes, cx } = useStyles();

  const [oneOpen, setOneOpen] = useState(false);
  const [twoOpen, setTwoOpen] = useState(false);

  const handleFileClick = (label: string) => {};

  const files = [
    {
      label: "World",
      active: true,
    },
    {
      label: "New",
    },
    {
      label: "Hello",
    },
  ];

  return (
    <Panel title="Assets">
      <Stack>
        <Directory
          label={"Assets"}
          open={oneOpen}
          onFolderClick={() => {
            setOneOpen(!oneOpen);
          }}
          onFileClick={handleFileClick}
          files={files}
        />
        <Directory
          label={"Assets 2"}
          open={twoOpen}
          onFolderClick={() => {
            setTwoOpen(!twoOpen);
          }}
          onFileClick={handleFileClick}
          files={files}
        />
        <FileDrop onDrop={() => {}} />
      </Stack>
    </Panel>
  );
};
