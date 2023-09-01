import { Card, Group, Image, Text, createStyles } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faFolder,
  faFolderOpen,
} from "@fortawesome/pro-regular-svg-icons";

export type FileCardProps = {
  label: string;
  onClick: (label: string) => void;
  active?: boolean;
  file?: File;
};

const useStyles = createStyles(
  (theme, { active }: Pick<FileCardProps, "active">) => ({
    card: {
      width: "100%",
      cursor: "pointer",
      padding: theme.spacing.xs,
      backgroundColor: active ? theme.colors.dark[4] : undefined,
    },
    image: {
      height: "24px",
      width: "24px",
      borderRadius: theme.radius.sm,
    },
  })
);

export const FileCard: React.FC<FileCardProps> = ({
  label,
  active,
  onClick,
  file,
}) => {
  const { classes } = useStyles({ active });

  return (
    <Card
      className={classes.card}
      onClick={() => {
        onClick(label);
      }}
      withBorder={active}
    >
      <Group>
        {file ? (
          <img className={classes.image} src={URL.createObjectURL(file)} />
        ) : (
          <FontAwesomeIcon icon={faFile} />
        )}
        <Text>{label}</Text>
      </Group>
    </Card>
  );
};
