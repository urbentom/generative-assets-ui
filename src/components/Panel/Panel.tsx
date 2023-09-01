import { Box, Title, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.dark[5],
    borderRadius: theme.radius.md,
    height: "100%",
  },
  panelTitle: {
    marginBottom: theme.spacing.md,
  },
}));

export type PanelProps = {
  title: string;
  children: React.ReactNode;
};

export const Panel: React.FC<PanelProps> = ({ children, title }) => {
  const { classes, cx } = useStyles();

  return (
    <Box className={cx(classes["wrapper"])}>
      <Title order={3} className={cx(classes["panelTitle"])}>
        {title}
      </Title>
      <Box>{children}</Box>
    </Box>
  );
};
