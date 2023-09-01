import { useRef } from "react";
import { Dropzone } from "@mantine/dropzone";
import { createStyles } from "@mantine/styles";
import { Card, Stack, Text, Title } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUpload } from "@fortawesome/pro-regular-svg-icons";

const useStyles = createStyles((theme) => ({
  dropzone: {},
  stack: {
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
  },
  text: {
    textAlign: "center",
  },
}));

export type FileZoneProps = {
  onDrop: (files: File[]) => void;
  accept?: string[];
  maxSize?: number;
};

export const FileDrop: React.FC<FileZoneProps> = ({
  onDrop,
  accept,
  maxSize,
}) => {
  const openRef = useRef<() => void>(null);
  const { classes, cx } = useStyles();

  return (
    <Dropzone
      openRef={openRef}
      onDrop={onDrop}
      className={classes.dropzone}
      radius="md"
      accept={accept}
      maxSize={maxSize}
    >
      <Card>
        <Stack className={classes.stack}>
          <FontAwesomeIcon size="2xl" icon={faCloudUpload} />
          <Title order={4} className={classes.title}>
            Upload Asset Folder
          </Title>
          <Text className={classes.text}>
            Drag 'n' drop a folder with all of your assets for a given layer
          </Text>
        </Stack>
      </Card>
    </Dropzone>
  );
};
