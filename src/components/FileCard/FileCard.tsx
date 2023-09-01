import { Card, Group, Text, createStyles } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faFolderOpen } from "@fortawesome/pro-regular-svg-icons";

export type FileCardProps = {
  label: string;
  onClick: (label: string) => void;
  active?: boolean;
};

const useStyles = createStyles((theme) => ({
  card: {
    width: "100%",
    cursor: "pointer",
    padding: theme.spacing.xs,
  },
}));

export const FileCard: React.FC<FileCardProps> = ({
  label,
  active,
  onClick,
}) => {
  "use client";
  const { classes, cx } = useStyles();

  return (
    <Card
      className={cx(classes["card"])}
      onClick={() => {
        onClick(label);
      }}
      withBorder={active}
    >
      <Group>
        <Text>{label}</Text>
      </Group>
    </Card>
  );
};
