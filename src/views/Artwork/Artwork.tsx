import { Box, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  box: {
    height: 500,
    width: 500,
    backgroundColor: theme.colors.dark[4],
    borderRadius: theme.radius.md,
  },
}));

export const Artwork = () => {
  const { classes, cx } = useStyles();
  return (
    <Box className={classes.wrapper}>
      <Box className={classes.box}></Box>
    </Box>
  );
};
