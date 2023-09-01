import { Card, Group, Text, createStyles } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faFolderOpen } from "@fortawesome/pro-regular-svg-icons";

export type FileCardProps = {
  label: string;
  onClick: (label: string) => void;
  active?: boolean;
};

const useStyles = createStyles(
  (theme, { active }: Pick<FileCardProps, "active">) => ({
    card: {
      width: "100%",
      cursor: "pointer",
      padding: theme.spacing.xs,
      backgroundColor: active ? theme.colors.dark[4] : undefined,
    },
  })
);

export const FileCard: React.FC<FileCardProps> = ({
  label,
  active,
  onClick,
}) => {
  "use client";
  const { classes, cx } = useStyles({ active });

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
