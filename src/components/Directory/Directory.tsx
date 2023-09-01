import { Box, Divider, Stack, createStyles } from "@mantine/core";
import { FileCard, FileCardProps } from "../FileCard";
import { FolderCard } from "../FolderCard";

export type DirectoryProps = {
  label: string;
  open?: boolean;
  onFolderClick: (label: string) => void;
  onFileClick: (label: string) => void;
  files?: Array<Omit<FileCardProps, "onClick">>;
};

const useStyles = createStyles((theme) => ({
  wrapper: {},
  fileWrapper: {
    paddingLeft: theme.spacing.md,
    gap: theme.spacing.xs,
    display: "flex",
  },
  fileStack: {
    width: "100%",
    paddingTop: theme.spacing.xs,
    gap: theme.spacing.xs,
  },
}));

export const Directory: React.FC<DirectoryProps> = ({
  label,
  open,
  onFolderClick,
  onFileClick,
  files,
}) => {
  const { classes, cx } = useStyles();
  return (
    <Box className={cx(classes["wrapper"])}>
      <FolderCard label={label} open={open} onClick={onFolderClick} />
      {open && (
        <Box className={cx(classes["fileWrapper"])}>
          <Divider orientation="vertical" />
          <Stack className={cx(classes["fileStack"])}>
            {files?.map((file) => (
              <FileCard key={file.label} {...file} onClick={onFileClick} />
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};
