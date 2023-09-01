import { Card, Group, Text, createStyles } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faFolderOpen } from "@fortawesome/pro-regular-svg-icons";

export type FolderCardProps = {
  label: string;
  onClick: (label: string) => void;
  open?: boolean;
};

const useStyles = createStyles((theme) => ({
  card: {
    width: "100%",
    borderRadius: theme.radius.md,
    cursor: "pointer",
  },
}));

export const FolderCard: React.FC<FolderCardProps> = ({
  label,
  open,
  onClick,
}) => {
  const { classes, cx } = useStyles();

  return (
    <Card
      className={cx(classes["card"])}
      onClick={() => {
        onClick(label);
      }}
    >
      <Group>
        <FontAwesomeIcon icon={open ? faFolderOpen : faFolder} />
        <Text>{label}</Text>
      </Group>
    </Card>
  );
};
